/*! pjax-api v3.4.4 https://github.com/falsandtru/pjax-api | (c) 2016, falsandtru | GPL-2.0 License */
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
            var api_1 = require('./layer/interface/service/api');
            exports.Pjax = api_1.API;
            var api_2 = require('./layer/interface/service/api');
            exports.default = api_2.API;
        },
        { './layer/interface/service/api': 41 }
    ],
    5: [
        function (require, module, exports) {
            'use strict';
            function __export(m) {
                for (var p in m)
                    if (!exports.hasOwnProperty(p))
                        exports[p] = m[p];
            }
            var spica_1 = require('spica');
            var config_1 = require('../domain/data/config');
            exports.Config = config_1.Config;
            var scope_1 = require('./config/scope');
            var router_1 = require('../domain/event/router');
            var api_1 = require('../domain/router/api');
            var error_1 = require('./data/error');
            function route(config, event, state, io) {
                var location = new router_1.RouterEvent(event).location;
                return scope_1.scope(config, {
                    orig: location.orig.pathname,
                    dest: location.dest.pathname
                }).extract(function () {
                    return Promise.resolve(spica_1.Left(new error_1.ApplicationError('Disabled to use pjax by config.')));
                }, function (config) {
                    return api_1.route(new api_1.RouterEntity(new router_1.RouterEvent(event), config, new api_1.RouterEntity.State(state.scripts, state.cancelable)), io);
                });
            }
            exports.route = route;
            __export(require('./store/path'));
            var html_1 = require('../domain/router/module/fetch/html');
            exports.parse = html_1.parse;
        },
        {
            '../domain/data/config': 13,
            '../domain/event/router': 15,
            '../domain/router/api': 16,
            '../domain/router/module/fetch/html': 20,
            './config/scope': 6,
            './data/error': 7,
            './store/path': 8,
            'spica': undefined
        }
    ],
    6: [
        function (require, module, exports) {
            'use strict';
            var spica_1 = require('spica');
            var config_1 = require('../../domain/data/config');
            function scope(config, path) {
                return spica_1.Sequence.from(Object.keys(config.scope).sort().reverse()).dropWhile(function (pattern) {
                    return !!!compare(path.orig, pattern) && !compare(path.dest, pattern);
                }).take(1).filter(function (pattern) {
                    return !!compare(path.orig, pattern) && compare(path.dest, pattern);
                }).map(function (pattern) {
                    return config.scope[pattern];
                }).map(function (option) {
                    return option ? spica_1.Just(new config_1.Config(spica_1.extend({}, config, option))) : spica_1.Nothing;
                }).extract().reduce(function (_, m) {
                    return m;
                }, spica_1.Nothing);
            }
            exports.scope = scope;
            function compare(path, pattern) {
                var regSegment = /\/|[^\/]+\/?/g;
                return spica_1.Sequence.zip(spica_1.Sequence.cycle([path]), spica_1.Sequence.from(expand(pattern))).map(function (_a) {
                    var path = _a[0], pattern = _a[1];
                    return [
                        path.match(regSegment) || [],
                        pattern.match(regSegment) || []
                    ];
                }).filter(function (_a) {
                    var path = _a[0], pattern = _a[1];
                    return path.length >= pattern.length;
                }).filter(function (_a) {
                    var path = _a[0], pattern = _a[1];
                    return spica_1.Sequence.zip(spica_1.Sequence.from(path), spica_1.Sequence.from(pattern)).takeWhile(function (_a) {
                        var s = _a[0], p = _a[1];
                        return match(s, p);
                    }).extract().length === pattern.length;
                }).take(1).extract().length > 0;
            }
            exports.compare = compare;
            function expand(pattern) {
                return spica_1.Sequence.from((pattern.match(/{.*?}|[^{]*/g) || []).map(function (p) {
                    return p[0] === '{' ? p.slice(1, -1).split(',') : [p];
                })).mapM(spica_1.Sequence.from).map(function (ps) {
                    return ps.join('');
                }).extract();
            }
            exports.expand = expand;
            function match(segment, pattern) {
                pattern = pattern.replace(/[?]*[*]+[?]*/g, '*').replace(/[*]+/g, '*');
                var _a = Array.from(pattern).map(function (p, i) {
                        return p === '*' ? [
                            p,
                            pattern.slice(i + 1).match(/^[^?*\/]*/)[0]
                        ] : [
                            p,
                            ''
                        ];
                    }).reduce(function (_a, _b) {
                        var ls = _a[0], _c = _a[1], r = _c[0], rs = _c.slice(1), s = _a[2];
                        var p = _b[0], ps = _b[1];
                        if (!s)
                            return [
                                ls,
                                [r].concat(rs),
                                s
                            ];
                        switch (p) {
                        case '?':
                            return [
                                ls.concat([r]),
                                rs,
                                s
                            ];
                        case '*':
                            var seg = r.concat(rs.join(''));
                            return seg.includes(ps) ? ps === '' ? [
                                ls.concat(Array.from(seg.replace(/\/$/, ''))),
                                Array.from(seg.replace(/.*?(?=\/?$)/, '')),
                                s
                            ] : [
                                ls.concat(Array.from(seg.split(ps, 1).pop())),
                                Array.from(ps + seg.split(ps, 2).pop()),
                                s
                            ] : [
                                ls,
                                [r].concat(rs),
                                !s
                            ];
                        default:
                            return r === p ? [
                                ls.concat([r]),
                                rs,
                                s
                            ] : [
                                ls,
                                [r].concat(rs),
                                !s
                            ];
                        }
                    }, [
                        Array.from(''),
                        Array.from(segment),
                        true
                    ]), rest = _a[1], state = _a[2];
                return rest.length === 0 && state;
            }
            exports.match = match;
        },
        {
            '../../domain/data/config': 13,
            'spica': undefined
        }
    ],
    7: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            var error_1 = require('../../../lib/error');
            var ApplicationError = function (_super) {
                __extends(ApplicationError, _super);
                function ApplicationError(msg) {
                    return _super.call(this, 'Application: ' + msg) || this;
                }
                return ApplicationError;
            }(error_1.PjaxError);
            exports.ApplicationError = ApplicationError;
        },
        { '../../../lib/error': 50 }
    ],
    8: [
        function (require, module, exports) {
            'use strict';
            var path_1 = require('../../domain/store/path');
            exports.loadTitle = path_1.loadTitle;
            exports.savePosition = path_1.savePosition;
        },
        { '../../domain/store/path': 35 }
    ],
    9: [
        function (require, module, exports) {
            'use strict';
            function canonicalizeUrl(url) {
                return url.replace(/(?:%\w{2})+/g, function (str) {
                    return str.toUpperCase();
                });
            }
            exports.canonicalizeUrl = canonicalizeUrl;
        },
        {}
    ],
    10: [
        function (require, module, exports) {
            'use strict';
            var parser = document.createElement('a');
            function validateUrl(url) {
                url = url.trim();
                url = (parser.href = url || location.href, parser.href);
                url = encodeURI(decodeURI(url)).replace(/%25/g, '%');
                url = url.replace(/["`^|\\<>{}\[\]\s].*/, '');
                return url;
            }
            exports.validateUrl = validateUrl;
        },
        {}
    ],
    11: [
        function (require, module, exports) {
            'use strict';
            var url_1 = require('../../../lib/url');
            var PathSchema = function () {
                function PathSchema() {
                    this.host = new url_1.Url('').host;
                    this.title = '';
                    this.position = {
                        top: void 0,
                        left: void 0
                    };
                }
                return PathSchema;
            }();
            exports.PathSchema = PathSchema;
        },
        { '../../../lib/url': 52 }
    ],
    12: [
        function (require, module, exports) {
            'use strict';
            var localsocket_1 = require('localsocket');
            var path_1 = require('../schema/path');
            var url_1 = require('../../../lib/url');
            var sock = localsocket_1.socket('pjax:path', {
                schema: function () {
                    return new path_1.PathSchema();
                }
            });
            void sock.recent(100, function (keys) {
                return void sock.sync(keys);
            });
            exports.store = {
                link: function (path) {
                    return sock.link(new url_1.Url(path).path, 3 * 24 * 3600 * 1000);
                }
            };
        },
        {
            '../../../lib/url': 52,
            '../schema/path': 11,
            'localsocket': undefined
        }
    ],
    13: [
        function (require, module, exports) {
            'use strict';
            var spica_1 = require('spica');
            var url_1 = require('../../../lib/url');
            var Config = function () {
                function Config(option) {
                    this.areas = ['body'];
                    this.link = 'a:not([target])';
                    this.form = 'form:not([method])';
                    this.replace = '';
                    this.fetch = {
                        timeout: 3000,
                        wait: 0
                    };
                    this.update = {
                        head: 'base, meta, link',
                        css: true,
                        script: true,
                        ignore: '[href^="chrome-extension://"], [src*=".scr.kaspersky-labs.com/"]',
                        reload: '',
                        logger: ''
                    };
                    this.sequence = new Sequence();
                    this.balance = {
                        bounds: [''],
                        weight: 1,
                        random: 0,
                        client: {
                            hosts: [],
                            support: {
                                balance: /msie|trident.+ rv:|chrome|firefox|safari/i,
                                redirect: /msie|trident.+ rv:|chrome|firefox|safari/i
                            },
                            cookie: {
                                balance: 'balanceable',
                                redirect: 'redirectable'
                            }
                        },
                        server: {
                            header: 'X-Ajax-Host',
                            expiry: 3 * 24 * 3600 * 1000
                        }
                    };
                    this.store = { expiry: 3 * 3600 * 1000 };
                    this.progressbar = 'display:none;position:absolute;bottom:0;left:0;width:0;height:2px;background:rgb(40, 105, 255);';
                    this.scope = { '/': {} };
                    void spica_1.extend(this, option);
                    void Object.freeze(this);
                }
                Config.prototype.filter = function (el) {
                    if (typeof el.href !== 'string')
                        return false;
                    return /^https?:$/.test(new url_1.Url(el.href).protocol);
                };
                Config.prototype.rewrite = function (_doc, _area, _host) {
                };
                Config.prototype.fallback = function (target, reason) {
                    if (target instanceof HTMLAnchorElement) {
                        return void window.location.assign(target.href);
                    }
                    if (target instanceof HTMLFormElement) {
                        return void window.location.assign(target.action);
                    }
                    if (target instanceof Window) {
                        return void window.location.reload(true);
                    }
                    throw reason;
                };
                return Config;
            }();
            exports.Config = Config;
            var Sequence = function () {
                function Sequence() {
                }
                Sequence.prototype.fetch = function (_result, _request) {
                    return Promise.resolve();
                };
                Sequence.prototype.unload = function (_result, _response) {
                    return Promise.resolve();
                };
                Sequence.prototype.ready = function (_result) {
                    return Promise.resolve();
                };
                Sequence.prototype.load = function (_result) {
                };
                return Sequence;
            }();
        },
        {
            '../../../lib/url': 52,
            'spica': undefined
        }
    ],
    14: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            var error_1 = require('../../../lib/error');
            var DomainError = function (_super) {
                __extends(DomainError, _super);
                function DomainError(msg) {
                    return _super.call(this, 'Domain: ' + msg) || this;
                }
                return DomainError;
            }(error_1.PjaxError);
            exports.DomainError = DomainError;
        },
        { '../../../lib/error': 50 }
    ],
    15: [
        function (require, module, exports) {
            'use strict';
            var url_1 = require('../../../lib/url');
            var url_2 = require('../../data/model/canonicalization/url');
            var url_3 = require('../../data/model/validation/url');
            var dom_1 = require('../../../lib/dom');
            var RouterEvent = function () {
                function RouterEvent(original) {
                    this.original = original;
                    this.source = this.original._currentTarget;
                    this.type = this.original.type.toLowerCase();
                    this.request = new RouterEvent.Request(this.source, this.type);
                    this.location = new RouterEvent.Location(this.request.url);
                    void Object.freeze(this);
                }
                return RouterEvent;
            }();
            exports.RouterEvent = RouterEvent;
            (function (RouterEvent) {
                var Type;
                (function (Type) {
                    Type.click = 'click';
                    Type.submit = 'submit';
                    Type.popstate = 'popstate';
                }(Type = RouterEvent.Type || (RouterEvent.Type = {})));
                var Method;
                (function (Method) {
                    Method.GET = 'GET';
                    Method.POST = 'POST';
                }(Method = RouterEvent.Method || (RouterEvent.Method = {})));
                var Request = function () {
                    function Request(source, eventType) {
                        var _this = this;
                        this.source = source;
                        this.eventType = eventType;
                        this.method = function () {
                            switch (_this.eventType) {
                            case Type.click:
                                return Method.GET;
                            case Type.submit:
                                return _this.source.method.toUpperCase() === Method.POST ? Method.POST : Method.GET;
                            case Type.popstate:
                                return Method.GET;
                            default:
                                throw new TypeError();
                            }
                        }();
                        this.url = function () {
                            switch (_this.eventType) {
                            case Type.click:
                                return url_2.canonicalizeUrl(url_3.validateUrl(_this.source.href));
                            case Type.submit:
                                return url_2.canonicalizeUrl(url_3.validateUrl(_this.source.method.toUpperCase() === Method.POST ? _this.source.action.split(/[?#]/).shift() : _this.source.action.split(/[?#]/).shift().concat('?' + dom_1.serialize(_this.source))));
                            case Type.popstate:
                                return url_2.canonicalizeUrl(url_3.validateUrl(window.location.href));
                            default:
                                throw new TypeError();
                            }
                        }();
                        this.data = this.method === Method.POST ? new FormData(this.source) : null;
                        void Object.freeze(this);
                    }
                    return Request;
                }();
                RouterEvent.Request = Request;
                var Location = function () {
                    function Location(target) {
                        this.target = target;
                        this.orig = new url_1.Url(url_2.canonicalizeUrl(url_3.validateUrl(window.location.href)));
                        this.dest = new url_1.Url(this.target);
                        void Object.freeze(this);
                    }
                    return Location;
                }();
                RouterEvent.Location = Location;
            }(RouterEvent = exports.RouterEvent || (exports.RouterEvent = {})));
            exports.RouterEvent = RouterEvent;
        },
        {
            '../../../lib/dom': 49,
            '../../../lib/url': 52,
            '../../data/model/canonicalization/url': 9,
            '../../data/model/validation/url': 10
        }
    ],
    16: [
        function (require, module, exports) {
            'use strict';
            function __export(m) {
                for (var p in m)
                    if (!exports.hasOwnProperty(p))
                        exports[p] = m[p];
            }
            __export(require('./service/api'));
        },
        { './service/api': 32 }
    ],
    17: [
        function (require, module, exports) {
            'use strict';
            var router_1 = require('../../../event/router');
            var RouterEntity = function () {
                function RouterEntity(event, config, state) {
                    this.event = event;
                    this.config = config;
                    this.state = state;
                    void Object.freeze(this);
                }
                return RouterEntity;
            }();
            exports.RouterEntity = RouterEntity;
            (function (RouterEntity) {
                RouterEntity.Event = router_1.RouterEvent;
                var State = function () {
                    function State(scripts, cancelable) {
                        this.scripts = scripts;
                        this.cancelable = cancelable;
                        void Object.freeze(this);
                    }
                    return State;
                }();
                RouterEntity.State = State;
            }(RouterEntity = exports.RouterEntity || (exports.RouterEntity = {})));
            exports.RouterEntity = RouterEntity;
        },
        { '../../../event/router': 15 }
    ],
    18: [
        function (require, module, exports) {
            'use strict';
            var html_1 = require('../../../module/fetch/html');
            var FetchValue = function () {
                function FetchValue(xhr) {
                    this.xhr = xhr;
                    this.response = new (function () {
                        function class_1(xhr) {
                            this.xhr = xhr;
                            this.headers = {};
                            this.document = this.xhr.responseType === 'document' ? this.xhr.responseXML : html_1.parse(this.xhr.responseText).extract();
                            var separator = ':';
                            var regHeaderName = /^[0-9A-z\-]+$/;
                            void this.xhr.getAllResponseHeaders().split('\n').filter(function (s) {
                                return s.indexOf(separator) > 0;
                            }).map(function (s) {
                                return [
                                    s.slice(0, s.indexOf(separator)).trim(),
                                    s.slice(s.indexOf(separator) + 1).trim()
                                ];
                            }).filter(function (_a) {
                                var k = _a[0];
                                return regHeaderName.test(k);
                            }).reduce(function (h, _a) {
                                var k = _a[0], v = _a[1];
                                return h[k] = v, h;
                            }, this.headers);
                            void Object.freeze(this.headers);
                            void Object.freeze(this);
                        }
                        return class_1;
                    }())(this.xhr);
                    void Object.freeze(this);
                }
                return FetchValue;
            }();
            exports.FetchValue = FetchValue;
        },
        { '../../../module/fetch/html': 20 }
    ],
    19: [
        function (require, module, exports) {
            'use strict';
            var UpdateValue = function () {
                function UpdateValue(document) {
                    this.document = document;
                    void Object.freeze(this.document);
                    void Object.freeze(this);
                }
                return UpdateValue;
            }();
            exports.UpdateValue = UpdateValue;
        },
        {}
    ],
    20: [
        function (require, module, exports) {
            'use strict';
            var spica_1 = require('spica');
            var dom_1 = require('../../../../../lib/dom');
            exports.parse = [
                parseByDoc,
                parseByDOM
            ].reduce(function (m, parser) {
                return m.bind(function () {
                    return test(parser) ? spica_1.Left(parser) : m;
                });
            }, spica_1.Right(function () {
                return spica_1.Nothing;
            })).extract(function (parser) {
                return function (html) {
                    return spica_1.Just(parser(html));
                };
            });
            function parseByDOM(html) {
                var doc = new DOMParser().parseFromString(html, 'text/html');
                void fix(doc);
                return doc;
            }
            function parseByDoc(html) {
                var document = window.document.implementation.createHTMLDocument('');
                var title = dom_1.find(dom_1.parse(html.slice(0, html.search(/<\/title>/i) + 8)), 'title').reduce(function (title, el) {
                    return el.textContent || title;
                }, '');
                if ('function' === typeof DOMParser) {
                    document.title = title;
                }
                void document.open();
                void document.write(html);
                void document.close();
                if (document.title !== title) {
                    document.title = document.querySelector('title').textContent || '';
                }
                void fix(document);
                return document;
            }
            function fix(doc) {
                return void fixNoscript(doc).forEach(function (_a) {
                    var src = _a[0], fixed = _a[1];
                    return src.textContent = fixed.textContent;
                });
            }
            exports.fix = fix;
            function fixNoscript(doc) {
                return dom_1.find(doc, 'noscript').filter(function (el) {
                    return el.children.length > 0;
                }).map(function (el) {
                    var clone = el.cloneNode(true);
                    clone.textContent = el.innerHTML;
                    return [
                        el,
                        clone
                    ];
                });
            }
            exports._fixNoscript = fixNoscript;
            function test(parser) {
                try {
                    var html = '\n<html lang="en" class="html">\n  <head>\n    <link href="/">\n    <title>&amp;</title>\n    <noscript><style>/**/</style></noscript>\n  </head>\n  <body>\n    <noscript>noscript</noscript>\n    <a href="/"></a>\n    <script>document.head.remove();</script>\n  </body>\n</html>\n';
                    var doc = parser(html);
                    switch (false) {
                    case doc.URL && decodeURI(doc.URL) === decodeURI(window.location.href):
                    case doc.title === '&':
                    case !!doc.querySelector('html.html[lang="en"]'):
                    case !!doc.querySelector('head>link')['href']:
                    case !!doc.querySelector('body>a')['href']:
                    case !doc.querySelector('head>noscript>*'):
                    case doc.querySelector('script')['innerHTML'] === 'document.head.remove();':
                    case doc.querySelector('head>noscript')['textContent'] === '<style>/**/</style>':
                    case doc.querySelector('body>noscript')['textContent'] === 'noscript':
                        throw void 0;
                    }
                    return true;
                } catch (err) {
                    return false;
                }
            }
        },
        {
            '../../../../../lib/dom': 49,
            'spica': undefined
        }
    ],
    21: [
        function (require, module, exports) {
            'use strict';
            var spica_1 = require('spica');
            var fetch_1 = require('../../model/eav/value/fetch');
            var error_1 = require('../../../data/error');
            var ContentType = 'text/html';
            function xhr(method, url, data, setting, cancelable) {
                var xhr = new XMLHttpRequest();
                var wait = new Promise(function (resolve) {
                    return setTimeout(resolve, setting.wait);
                });
                return new Promise(function (resolve) {
                    return void xhr.open(method, url, true), xhr.responseType = /chrome|firefox/i.test(window.navigator.userAgent) && !/edge/i.test(window.navigator.userAgent) ? 'document' : 'text', xhr.timeout = setting.timeout, void xhr.setRequestHeader('X-Pjax', '1'), void xhr.send(data), void xhr.addEventListener('abort', function () {
                        return void handle(cancelable, function () {
                            return void resolve(spica_1.Left(new error_1.DomainError('Failed to request by abort.')));
                        }, function (err) {
                            return void resolve(spica_1.Left(err));
                        });
                    }), void xhr.addEventListener('error', function () {
                        return void handle(cancelable, function () {
                            return void resolve(spica_1.Left(new error_1.DomainError('Failed to request by error.')));
                        }, function (err) {
                            return void resolve(spica_1.Left(err));
                        });
                    }), void xhr.addEventListener('timeout', function () {
                        return void handle(cancelable, function () {
                            return void resolve(spica_1.Left(new error_1.DomainError('Failed to request by timeout.')));
                        }, function (err) {
                            return void resolve(spica_1.Left(err));
                        });
                    }), void xhr.addEventListener('load', function () {
                        return void handle(cancelable, function () {
                            return void verify(xhr).extract(function (err) {
                                return void resolve(spica_1.Left(err));
                            }, function (xhr) {
                                return void resolve(spica_1.Right(new fetch_1.FetchValue(xhr)));
                            });
                        }, function (err) {
                            return void resolve(spica_1.Left(err));
                        });
                    }), void cancelable.listeners.add(function () {
                        return void xhr.abort();
                    });
                }).then(function (v) {
                    return wait.then(function () {
                        return v;
                    });
                });
                function handle(state, done, fail) {
                    return void state.either(0).extract(fail, done);
                }
            }
            exports.xhr = xhr;
            function verify(xhr) {
                return spica_1.Right(xhr).bind(function (xhr) {
                    return match(xhr.getResponseHeader('Content-Type'), ContentType) ? spica_1.Right(xhr) : spica_1.Left(new error_1.DomainError('Faild to validate a content type of response.'));
                });
            }
            exports.verify = verify;
            function match(actualContentType, expectedContentType) {
                return spica_1.Sequence.intersect(spica_1.Sequence.from(parse(actualContentType || '').sort()), spica_1.Sequence.from(parse(expectedContentType).sort()), function (a, b) {
                    return a.localeCompare(b);
                }).take(1).extract().length > 0;
            }
            exports.match = match;
            function parse(headerValue) {
                return headerValue.split(';').map(function (type) {
                    return type.trim();
                }).filter(function (type) {
                    return type.length > 0;
                });
            }
        },
        {
            '../../../data/error': 14,
            '../../model/eav/value/fetch': 18,
            'spica': undefined
        }
    ],
    22: [
        function (require, module, exports) {
            'use strict';
            function blur(document) {
                if (document !== window.document || document.activeElement === document.body)
                    return;
                void document.activeElement.blur();
                void document.body.focus();
            }
            exports.blur = blur;
        },
        {}
    ],
    23: [
        function (require, module, exports) {
            'use strict';
            var spica_1 = require('spica');
            var dom_1 = require('../../../../../lib/dom');
            var script_1 = require('./script');
            function content(document, areas, io) {
                if (io === void 0) {
                    io = {
                        replace: function (src, dst) {
                            return void dst.parentNode.replaceChild(src, dst);
                        }
                    };
                }
                return separate(document, areas).fmap(function (_a) {
                    var as = _a[1];
                    return as.map(load).reduce(spica_1.concat, []);
                }).fmap(function (ps) {
                    return Promise.all(ps).then(function (es) {
                        return [
                            document,
                            es
                        ];
                    });
                });
                function load(area) {
                    return area.src.map(function (_, i) {
                        return {
                            src: window.document.importNode(area.src[i].cloneNode(true), true),
                            dst: area.dst[i]
                        };
                    }).map(function (area) {
                        return void replace(area), dom_1.find(area.src, 'img, iframe, frame').map(wait);
                    }).reduce(spica_1.concat, []);
                    function replace(area) {
                        var unescape = dom_1.find(area.src, 'script').map(script_1.escape).reduce(function (f, g) {
                            return function () {
                                return void f(), void g();
                            };
                        }, function () {
                            return void 0;
                        });
                        void io.replace(area.src, area.dst);
                        void unescape();
                    }
                }
            }
            exports.content = content;
            function separate(document, areas) {
                return areas.reduce(function (m, area) {
                    return spica_1.Maybe.mplus(m, sep(document, area).fmap(function (as) {
                        return [
                            area,
                            as
                        ];
                    }));
                }, spica_1.Nothing);
                function sep(document, area) {
                    return split(area).reduce(function (acc, area) {
                        return acc.bind(function (as) {
                            return pair(area).fmap(function (a) {
                                return spica_1.concat(as, [a]);
                            });
                        });
                    }, spica_1.Just([]));
                    function pair(area) {
                        return maybeValid(cons(area));
                        function maybeValid(area) {
                            return validate(area) ? spica_1.Just(area) : spica_1.Nothing;
                            function validate(area) {
                                return area.src.length > 0 && area.src.length === area.dst.length;
                            }
                        }
                        function cons(area) {
                            return {
                                src: dom_1.find(document.src, area),
                                dst: dom_1.find(document.dst, area)
                            };
                        }
                    }
                }
            }
            exports.separate = separate;
            function match(document, areas) {
                return spica_1.Sequence.from(areas).bind(function (area) {
                    return spica_1.Sequence.from(validate(document, area).extract(function () {
                        return [];
                    }, function (area) {
                        return [area];
                    }));
                });
                function validate(document, area) {
                    return split(area).reduce(function (m, area) {
                        return m.bind(function () {
                            return dom_1.find(document, area).length > 0 ? m : spica_1.Nothing;
                        });
                    }, spica_1.Just(area));
                }
            }
            exports.match = match;
            function split(area) {
                return (area.match(/(?:[^,\(\[]+|\(.*?\)|\[.*?\])+/g) || []).map(function (a) {
                    return a.trim();
                });
            }
            exports._split = split;
            function wait(el) {
                return Promise.race([
                    'load',
                    'abort',
                    'error'
                ].map(function (type) {
                    return new Promise(function (resolve) {
                        return void dom_1.once(el, type, resolve);
                    });
                }));
            }
            exports._wait = wait;
        },
        {
            '../../../../../lib/dom': 49,
            './script': 27,
            'spica': undefined
        }
    ],
    24: [
        function (require, module, exports) {
            'use strict';
            var dom_1 = require('../../../../../lib/dom');
            var sync_1 = require('./sync');
            function css(scope, ignore) {
                var selector = 'link[rel~="stylesheet"], style';
                return void sync_1.sync(sync_1.pair(dom_1.find(scope.src, selector).filter(function (el) {
                    return !el.matches(ignore.trim() || '_');
                }), dom_1.find(scope.dst, selector).filter(function (el) {
                    return !el.matches(ignore.trim() || '_');
                }), compare), scope.dst);
            }
            exports.css = css;
            function compare(a, b) {
                switch (a.tagName.toLowerCase()) {
                case 'link':
                    return a.href === b.href;
                case 'style':
                    return a.innerHTML.trim() === b.innerHTML.trim();
                default:
                    return false;
                }
            }
        },
        {
            '../../../../../lib/dom': 49,
            './sync': 29
        }
    ],
    25: [
        function (require, module, exports) {
            'use strict';
            var dom_1 = require('../../../../../lib/dom');
            function focus(document) {
                return void dom_1.find(document, 'body, [autofocus]').slice(-1).filter(function (el) {
                    return document === window.document && el !== document.activeElement;
                }).forEach(function (el) {
                    return void el.focus();
                });
            }
            exports.focus = focus;
        },
        { '../../../../../lib/dom': 49 }
    ],
    26: [
        function (require, module, exports) {
            'use strict';
            var sync_1 = require('./sync');
            var dom_1 = require('../../../../../lib/dom');
            function head(scope, selector, ignore) {
                ignore += selector.indexOf('link') > -1 ? ', link[rel~="stylesheet"]' : '';
                return void sync_1.sync(sync_1.pair(dom_1.find(scope.src, selector).filter(function (el) {
                    return !el.matches(ignore.trim() || '_');
                }), dom_1.find(scope.dst, selector).filter(function (el) {
                    return !el.matches(ignore.trim() || '_');
                }), compare), scope.dst);
            }
            exports.head = head;
            function compare(a, b) {
                return a.outerHTML === b.outerHTML;
            }
        },
        {
            '../../../../../lib/dom': 49,
            './sync': 29
        }
    ],
    27: [
        function (require, module, exports) {
            'use strict';
            var spica_1 = require('spica');
            var dom_1 = require('../../../../../lib/dom');
            var url_1 = require('../../../../data/model/canonicalization/url');
            var url_2 = require('../../../../data/model/validation/url');
            function script(document, skip, selector, cancelable, io) {
                if (io === void 0) {
                    io = {
                        request: request,
                        evaluate: evaluate,
                        log: log
                    };
                }
                var scripts = dom_1.find(document.src, 'script').filter(function (el) {
                    return !el.type || /(?:application|text)\/(?:java|ecma)script/i.test(el.type);
                }).filter(function (el) {
                    return !el.matches(selector.ignore.trim() || '_');
                }).filter(function (el) {
                    return el.hasAttribute('src') ? !skip.has(url_1.canonicalizeUrl(url_2.validateUrl(el.src))) || el.matches(selector.reload.trim() || '_') : true;
                });
                return new Promise(function (resolve, reject) {
                    return void Promise.all(scripts.reduce(function (rs, script) {
                        return spica_1.concat(rs, [io.request(script)]);
                    }, [])).then(function (rs) {
                        return rs.reduce(function (acc, m) {
                            return m.bind(function (res) {
                                return run(acc, res);
                            });
                        }, spica_1.Right([]));
                    }).then(resolve, reject);
                });
                function run(state, response) {
                    return state.bind(cancelable.either).bind(function (scripts) {
                        return io.evaluate(response).fmap(function (script) {
                            return script.parentElement.matches(selector.logger.trim() || '_') ? void io.log(script, document.dst) : void 0, scripts.concat([script]);
                        });
                    });
                }
            }
            exports.script = script;
            function escape(script) {
                var src = script.hasAttribute('src') ? script.getAttribute('src') : null;
                var code = script.innerHTML;
                void script.removeAttribute('src');
                script.innerHTML = '';
                return function () {
                    return script.innerHTML = ' ', script.innerHTML = code, typeof src === 'string' ? void script.setAttribute('src', src) : void 0;
                };
            }
            exports.escape = escape;
            function request(script) {
                if (script.hasAttribute('src')) {
                    var xhr_1 = new XMLHttpRequest();
                    void xhr_1.open('GET', script.src, true);
                    void xhr_1.send();
                    return new Promise(function (resolve) {
                        return [
                            'load',
                            'abort',
                            'error',
                            'timeout'
                        ].forEach(function (type) {
                            switch (type) {
                            case 'load':
                                return void xhr_1.addEventListener(type, function () {
                                    return void resolve(spica_1.Right([
                                        script,
                                        xhr_1.response
                                    ]));
                                });
                            default:
                                return void xhr_1.addEventListener(type, function () {
                                    return void resolve(spica_1.Left(new Error(script.src + ': ' + xhr_1.statusText)));
                                });
                            }
                        });
                    });
                } else {
                    return Promise.resolve(spica_1.Right([
                        script,
                        script.innerHTML
                    ]));
                }
            }
            exports._request = request;
            function evaluate(_a) {
                var script = _a[0], code = _a[1];
                try {
                    void eval(code);
                    if (script.hasAttribute('src')) {
                        void script.dispatchEvent(new Event('load'));
                    }
                    return spica_1.Right(script);
                } catch (err) {
                    if (script.hasAttribute('src')) {
                        void script.dispatchEvent(new Event('error'));
                    }
                    return spica_1.Left(err);
                }
            }
            exports._evaluate = evaluate;
            function log(script, document) {
                return dom_1.find(document, script.parentElement.id ? '#' + script.parentElement.id : script.parentElement.tagName).slice(-1).reduce(function (_, parent) {
                    script = document.importNode(script.cloneNode(true), true);
                    var unescape = escape(script);
                    void parent.appendChild(script);
                    void unescape();
                    return true;
                }, false);
            }
            exports._log = log;
        },
        {
            '../../../../../lib/dom': 49,
            '../../../../data/model/canonicalization/url': 9,
            '../../../../data/model/validation/url': 10,
            'spica': undefined
        }
    ],
    28: [
        function (require, module, exports) {
            'use strict';
            var spica_1 = require('spica');
            var entity_1 = require('../../model/eav/entity');
            var url_1 = require('../../../../../lib/url');
            var url_2 = require('../../../../data/model/canonicalization/url');
            var url_3 = require('../../../../data/model/validation/url');
            var dom_1 = require('../../../../../lib/dom');
            function scroll(type, document, target, io) {
                if (io === void 0) {
                    io = {
                        hash: hash,
                        scroll: window.scrollTo,
                        position: function (_path) {
                            return {
                                top: 0,
                                left: 0
                            };
                        }
                    };
                }
                switch (type) {
                case entity_1.RouterEntity.Event.Type.click:
                    return void (io.hash(document, target.hash, io) || scroll(target));
                case entity_1.RouterEntity.Event.Type.submit:
                    return void scroll(target);
                case entity_1.RouterEntity.Event.Type.popstate:
                    return void scroll(io.position(new url_1.Url(url_2.canonicalizeUrl(url_3.validateUrl(window.location.href))).path));
                default:
                    throw new TypeError(type);
                }
                function scroll(_a) {
                    var top = _a.top, left = _a.left;
                    left = left >= 0 ? left : window.pageXOffset;
                    top = top >= 0 ? top : window.pageYOffset;
                    void io.scroll.call(window, left, top);
                }
            }
            exports.scroll = scroll;
            function hash(document, hash, io) {
                if (io === void 0) {
                    io = { scroll: window.scrollTo };
                }
                return spica_1.Just(hash.split('#').pop() || '').bind(function (hash) {
                    return hash.length > 0 ? spica_1.Just(hash) : spica_1.Nothing;
                }).bind(function (hash) {
                    return dom_1.find(document, '#' + hash + ', [name="' + hash + '"]').reduce(function (m, el) {
                        return m.extract(function () {
                            return spica_1.Just(el);
                        }, spica_1.Just);
                    }, spica_1.Nothing);
                }).fmap(function (el) {
                    return void io.scroll.call(window, window.pageXOffset, window.pageYOffset + el.getBoundingClientRect().top | 0);
                }).extract(function () {
                    return false;
                }, function () {
                    return true;
                });
            }
            exports.hash = hash;
        },
        {
            '../../../../../lib/dom': 49,
            '../../../../../lib/url': 52,
            '../../../../data/model/canonicalization/url': 9,
            '../../../../data/model/validation/url': 10,
            '../../model/eav/entity': 17,
            'spica': undefined
        }
    ],
    29: [
        function (require, module, exports) {
            'use strict';
            var spica_1 = require('spica');
            function sync(pairs, fallback, io) {
                if (io === void 0) {
                    io = {
                        before: before,
                        remove: remove
                    };
                }
                return void pairs.forEach(function (_a) {
                    var srcs = _a[0], dst = _a[1];
                    return void io.before(parent(dst), srcs.slice(-1).some(function (src) {
                        return !!dst && src.outerHTML === dst.outerHTML;
                    }) ? srcs.slice(0, -1) : srcs, dst), dst && srcs.length === 0 ? void io.remove(dst) : void 0;
                });
                function parent(dst) {
                    return dst ? dst.parentElement : fallback;
                }
            }
            exports.sync = sync;
            function pair(srcs, dsts, compare) {
                var link = bind(srcs, dsts, compare);
                void dsts.filter(function (dst) {
                    return !link.has(dst);
                }).forEach(function (dst) {
                    return void link.set(dst, []);
                });
                return Array.from(link.entries()).map(function (_a) {
                    var dst = _a[0], srcs = _a[1];
                    return [
                        srcs,
                        dst
                    ];
                });
                function bind(srcs, dsts, compare) {
                    return srcs.reduce(function (link, src) {
                        return dsts.length === 0 ? link.set(null, spica_1.concat(link.get(null) || [], [src])) : dsts.reduce(function (m, dst) {
                            return m.bind(function (link) {
                                return !link.has(dst) && compare(src, dst) ? (void link.set(dst, spica_1.concat(link.get(null) || [], [src])), void link.delete(null), spica_1.Left(link)) : spica_1.Right(link);
                            });
                        }, spica_1.Right(link)).fmap(function (link) {
                            return link.set(null, spica_1.concat(link.get(null) || [], [src]));
                        }).extract(function (link) {
                            return link;
                        });
                    }, new Map());
                }
            }
            exports.pair = pair;
            function before(parent, children, ref) {
                return void children.map(function (child) {
                    return parent.ownerDocument.importNode(child.cloneNode(true), true);
                }).forEach(function (child) {
                    return void parent.insertBefore(child, ref);
                });
            }
            function remove(el) {
                return void el.remove();
            }
        },
        { 'spica': undefined }
    ],
    30: [
        function (require, module, exports) {
            'use strict';
            function title(document) {
                document.dst.title = document.src.title;
            }
            exports.title = title;
        },
        {}
    ],
    31: [
        function (require, module, exports) {
            'use strict';
            var entity_1 = require('../../model/eav/entity');
            function url(location, title, type, source, replaceable) {
                switch (true) {
                case isReplaceable(type, source, replaceable):
                    return void window.history.replaceState(null, title, location.dest.href);
                case isRegisterable(type, location):
                    return void window.history.pushState(null, title, location.dest.href);
                default:
                    return;
                }
            }
            exports.url = url;
            function isRegisterable(type, location) {
                if (location.orig.href === location.dest.href)
                    return false;
                switch (type) {
                case entity_1.RouterEntity.Event.Type.click:
                case entity_1.RouterEntity.Event.Type.submit:
                    return true;
                case entity_1.RouterEntity.Event.Type.popstate:
                    return false;
                default:
                    throw new TypeError(type);
                }
            }
            exports._isRegisterable = isRegisterable;
            function isReplaceable(type, source, selector) {
                switch (type) {
                case entity_1.RouterEntity.Event.Type.click:
                case entity_1.RouterEntity.Event.Type.submit:
                    return source.matches(selector.trim() || '_');
                case entity_1.RouterEntity.Event.Type.popstate:
                    return false;
                default:
                    throw new TypeError(type);
                }
            }
            exports._isReplaceable = isReplaceable;
        },
        { '../../model/eav/entity': 17 }
    ],
    32: [
        function (require, module, exports) {
            'use strict';
            var spica_1 = require('spica');
            var entity_1 = require('../model/eav/entity');
            exports.RouterEntity = entity_1.RouterEntity;
            var api_1 = require('./fetch/api');
            var api_2 = require('./update/api');
            var content_1 = require('../module/update/content');
            var path_1 = require('../../store/path');
            var error_1 = require('../../data/error');
            function route(entity, io) {
                return Promise.resolve().then(function () {
                    return content_1.match(window.document, entity.config.areas).take(1).extract().length > 0 ? entity.state.cancelable.either(void 0) : spica_1.Left(new error_1.DomainError('Failed to match areas.'));
                }).then(function (m) {
                    return m.bind(entity.state.cancelable.either).fmap(function () {
                        return api_1.fetch(entity.event.request, entity.config, entity.state.cancelable);
                    }).extract(spica_1.Left);
                }).then(function (m) {
                    return m.bind(entity.state.cancelable.either).fmap(function (_a) {
                        var res = _a[0], seq = _a[1];
                        return api_2.update(entity, res, seq, {
                            document: io.document,
                            scroll: window.scrollTo,
                            position: path_1.loadPosition
                        });
                    }).extract(function (e) {
                        return Promise.resolve(spica_1.Left(e));
                    });
                });
            }
            exports.route = route;
        },
        {
            '../../data/error': 14,
            '../../store/path': 35,
            '../model/eav/entity': 17,
            '../module/update/content': 23,
            './fetch/api': 33,
            './update/api': 34,
            'spica': undefined
        }
    ],
    33: [
        function (require, module, exports) {
            'use strict';
            var spica_1 = require('spica');
            var xhr_1 = require('../../module/fetch/xhr');
            var url_1 = require('../../../../../lib/url');
            function fetch(_a, _b, cancelable) {
                var method = _a.method, url = _a.url, data = _a.data;
                var setting = _b.fetch, sequence = _b.sequence;
                return new spica_1.HNil().push(xhr_1.xhr(method, url, data, setting, cancelable)).modify(function (p) {
                    return void window.dispatchEvent(new Event('pjax:fetch')), sequence.fetch(void 0, {
                        host: '',
                        path: new url_1.Url(url).path,
                        method: method,
                        data: data
                    }).then(function (s) {
                        return p.then(function (m) {
                            return m.fmap(function (v) {
                                return [
                                    v,
                                    s
                                ];
                            });
                        });
                    }, function (e) {
                        return spica_1.Left(e instanceof Error ? e : new Error(e));
                    });
                }).head();
            }
            exports.fetch = fetch;
        },
        {
            '../../../../../lib/url': 52,
            '../../module/fetch/xhr': 21,
            'spica': undefined
        }
    ],
    34: [
        function (require, module, exports) {
            'use strict';
            var spica_1 = require('spica');
            var update_1 = require('../../model/eav/value/update');
            var blur_1 = require('../../module/update/blur');
            var url_1 = require('../../module/update/url');
            var title_1 = require('../../module/update/title');
            var head_1 = require('../../module/update/head');
            var content_1 = require('../../module/update/content');
            var css_1 = require('../../module/update/css');
            var script_1 = require('../../module/update/script');
            var focus_1 = require('../../module/update/focus');
            var scroll_1 = require('../../module/update/scroll');
            var path_1 = require('../../../store/path');
            var error_1 = require('../../../data/error');
            function update(_a, _b, seq, io) {
                var event = _a.event, config = _a.config, state = _a.state;
                var _c = _b.response, headers = _c.headers, document = _c.document;
                var cancelable = state.cancelable;
                var doc = new update_1.UpdateValue({
                    src: document,
                    dst: io.document
                }).document;
                return new spica_1.HNil().push(Promise.resolve(cancelable.either(seq))).modify(function (p) {
                    return p.then(function (m) {
                        return m.bind(cancelable.either).fmap(function (seq) {
                            return content_1.separate(doc, config.areas).fmap(function (_a) {
                                var area = _a[0];
                                return void config.rewrite(doc.src, area, '');
                            }).extract(function () {
                                return Promise.resolve(spica_1.Left(new error_1.DomainError('Failed to separate areas.')));
                            }, function () {
                                return void window.dispatchEvent(new Event('pjax:unload')), config.sequence.unload(seq, {
                                    headers: headers,
                                    document: document
                                }).then(cancelable.either, function (e) {
                                    return spica_1.Left(e instanceof Error ? e : new Error(e));
                                });
                            });
                        }).extract();
                    });
                }).modify(function (p) {
                    return p.then(function (m) {
                        return m.bind(cancelable.either).fmap(function (seq) {
                            return new spica_1.HNil().push(void 0).modify(function () {
                                return void blur_1.blur(doc.dst);
                            }).modify(function () {
                                return void url_1.url(event.location, doc.src.title, event.type, event.source, config.replace);
                            }).modify(function () {
                                return void path_1.saveTitle(event.location.orig.path, doc.src.title), void path_1.saveTitle(event.location.dest.path, doc.dst.title), void title_1.title(doc);
                            }).modify(function () {
                                return void head_1.head({
                                    src: doc.src.head,
                                    dst: doc.dst.head
                                }, config.update.head, config.update.ignore);
                            }).modify(function () {
                                return content_1.content(doc, config.areas).extract(function () {
                                    return Promise.resolve(spica_1.Left(new error_1.DomainError('Failed to update areas.')));
                                }, function (p) {
                                    return p.then(cancelable.either, function (e) {
                                        return spica_1.Left(e instanceof Error ? e : new Error(e));
                                    });
                                });
                            }).extend(function () {
                                return config.update.css ? void css_1.css({
                                    src: doc.src.head,
                                    dst: doc.dst.head
                                }, config.update.ignore) : void 0;
                            }).modify(function () {
                                return config.update.css ? void css_1.css({
                                    src: doc.src.body,
                                    dst: doc.dst.body
                                }, config.update.ignore) : void 0;
                            }).modify(function () {
                                return void focus_1.focus(doc.dst);
                            }).modify(function () {
                                return void scroll_1.scroll(event.type, doc.dst, {
                                    hash: event.location.dest.hash,
                                    top: 0,
                                    left: 0
                                }, {
                                    hash: scroll_1.hash,
                                    scroll: io.scroll,
                                    position: io.position
                                });
                            }).modify(function () {
                                return config.update.script ? script_1.script(doc, state.scripts, config.update, cancelable) : Promise.resolve(cancelable.either([]));
                            }).extend(function () {
                                return void io.document.dispatchEvent(new Event('pjax:ready')), config.sequence.ready(seq).then(cancelable.either, spica_1.Left);
                            }).reverse().tuple();
                        });
                    });
                }).modify(function (p) {
                    return p.then(function (m) {
                        return m.bind(cancelable.either).fmap(function (ps) {
                            return Promise.all(ps).then(function (_a) {
                                var m1 = _a[0], m2 = _a[1], m3 = _a[2];
                                return cancelable.either(void 0).bind(function () {
                                    return m1.bind(function () {
                                        return m2;
                                    }).bind(function () {
                                        return m3;
                                    });
                                }).fmap(function (seq) {
                                    return void window.dispatchEvent(new Event('pjax:load')), void config.sequence.load(seq);
                                }).bind(function () {
                                    return m2;
                                });
                            });
                        }).extract();
                    });
                }).head();
            }
            exports.update = update;
        },
        {
            '../../../data/error': 14,
            '../../../store/path': 35,
            '../../model/eav/value/update': 19,
            '../../module/update/blur': 22,
            '../../module/update/content': 23,
            '../../module/update/css': 24,
            '../../module/update/focus': 25,
            '../../module/update/head': 26,
            '../../module/update/script': 27,
            '../../module/update/scroll': 28,
            '../../module/update/title': 30,
            '../../module/update/url': 31,
            'spica': undefined
        }
    ],
    35: [
        function (require, module, exports) {
            'use strict';
            var path_1 = require('../../data/store/path');
            function loadTitle(path) {
                return path_1.store.link(path).title;
            }
            exports.loadTitle = loadTitle;
            function saveTitle(path, title) {
                return path_1.store.link(path).title = title;
            }
            exports.saveTitle = saveTitle;
            function loadPosition(path) {
                return path_1.store.link(path).position;
            }
            exports.loadPosition = loadPosition;
            function savePosition(path, position) {
                path_1.store.link(path).position = position;
            }
            exports.savePosition = savePosition;
        },
        { '../../data/store/path': 12 }
    ],
    36: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            var error_1 = require('../../../lib/error');
            var InterfaceError = function (_super) {
                __extends(InterfaceError, _super);
                function InterfaceError(msg) {
                    return _super.call(this, 'Interface: ' + msg) || this;
                }
                return InterfaceError;
            }(error_1.PjaxError);
            exports.InterfaceError = InterfaceError;
        },
        { '../../../lib/error': 50 }
    ],
    37: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            var spica_1 = require('spica');
            var dom_1 = require('../../../../lib/dom');
            var ClickView = function () {
                function ClickView(document, selector, listener) {
                    var _this = this;
                    this.sv = new (function (_super) {
                        __extends(class_1, _super);
                        function class_1() {
                            return _super !== null && _super.apply(this, arguments) || this;
                        }
                        return class_1;
                    }(spica_1.Supervisor))();
                    this.close = function () {
                        return void _this.sv.terminate();
                    };
                    void this.sv.register('', function () {
                        return [
                            void _this.sv.events.exit.once([], dom_1.delegate(document.documentElement, selector, 'click', listener)),
                            void 0
                        ];
                    }, void 0);
                    void this.sv.cast('', void 0);
                }
                return ClickView;
            }();
            exports.ClickView = ClickView;
        },
        {
            '../../../../lib/dom': 49,
            'spica': undefined
        }
    ],
    38: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            var spica_1 = require('spica');
            var url_1 = require('../../service/state/url');
            var dom_1 = require('../../../../lib/dom');
            var NavigationView = function () {
                function NavigationView(window, listener) {
                    var _this = this;
                    this.sv = new (function (_super) {
                        __extends(class_1, _super);
                        function class_1() {
                            return _super !== null && _super.apply(this, arguments) || this;
                        }
                        return class_1;
                    }(spica_1.Supervisor))();
                    this.close = function () {
                        return void _this.sv.terminate();
                    };
                    void this.sv.register('', function () {
                        return [
                            void _this.sv.events.exit.once([], dom_1.bind(window, 'popstate', function (ev) {
                                if (url_1.isInvalidPopstateEvent(ev))
                                    return;
                                void listener(ev);
                            })),
                            void 0
                        ];
                    }, void 0);
                    void this.sv.cast('', void 0);
                }
                return NavigationView;
            }();
            exports.NavigationView = NavigationView;
        },
        {
            '../../../../lib/dom': 49,
            '../../service/state/url': 48,
            'spica': undefined
        }
    ],
    39: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            var spica_1 = require('spica');
            var dom_1 = require('../../../../lib/dom');
            var ScrollView = function () {
                function ScrollView(window, listener) {
                    var _this = this;
                    this.sv = new (function (_super) {
                        __extends(class_1, _super);
                        function class_1() {
                            return _super !== null && _super.apply(this, arguments) || this;
                        }
                        return class_1;
                    }(spica_1.Supervisor))();
                    this.close = function () {
                        return void _this.sv.terminate();
                    };
                    var timer = 0;
                    void this.sv.register('', function () {
                        return [
                            void _this.sv.events.exit.once([], dom_1.bind(window, 'scroll', function (event) {
                                return timer = timer > 0 ? timer : setTimeout(function () {
                                    return timer = 0, void listener(event);
                                }, 300);
                            }, { passive: true })),
                            void 0
                        ];
                    }, void 0);
                    void this.sv.cast('', void 0);
                }
                return ScrollView;
            }();
            exports.ScrollView = ScrollView;
        },
        {
            '../../../../lib/dom': 49,
            'spica': undefined
        }
    ],
    40: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            var spica_1 = require('spica');
            var dom_1 = require('../../../../lib/dom');
            var SubmitView = function () {
                function SubmitView(document, selector, listener) {
                    var _this = this;
                    this.sv = new (function (_super) {
                        __extends(class_1, _super);
                        function class_1() {
                            return _super !== null && _super.apply(this, arguments) || this;
                        }
                        return class_1;
                    }(spica_1.Supervisor))();
                    this.close = function () {
                        return void _this.sv.terminate();
                    };
                    void this.sv.register('', function () {
                        return [
                            void _this.sv.events.exit.once([], dom_1.delegate(document.documentElement, selector, 'submit', listener)),
                            void 0
                        ];
                    }, void 0);
                    void this.sv.cast('', void 0);
                }
                return SubmitView;
            }();
            exports.SubmitView = SubmitView;
        },
        {
            '../../../../lib/dom': 49,
            'spica': undefined
        }
    ],
    41: [
        function (require, module, exports) {
            'use strict';
            var gui_1 = require('./gui');
            exports.API = gui_1.GUI;
        },
        { './gui': 42 }
    ],
    42: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            var spica_1 = require('spica');
            var api_1 = require('../../application/api');
            var url_1 = require('../../../lib/url');
            var url_2 = require('../../data/model/canonicalization/url');
            var url_3 = require('../../data/model/validation/url');
            var click_1 = require('../module/view/click');
            var submit_1 = require('../module/view/submit');
            var navigation_1 = require('../module/view/navigation');
            var scroll_1 = require('../module/view/scroll');
            var initialization_1 = require('../service/state/initialization');
            var url_4 = require('../service/state/url');
            require('../service/state/scroll-restoration');
            var router_1 = require('../service/router');
            var api_2 = require('../../application/api');
            var dom_1 = require('../../../lib/dom');
            var GUI = function () {
                function GUI(option, io) {
                    if (io === void 0) {
                        io = { document: window.document };
                    }
                    var _this = this;
                    this.option = option;
                    this.io = io;
                    this.config = new api_1.Config(this.option);
                    void GUI.sv.terminate('');
                    void GUI.sv.register('', function () {
                        return void GUI.sv.events.exit.once([], new click_1.ClickView(_this.io.document, _this.config.link, function (event) {
                            return void spica_1.Just(new url_1.Url(url_2.canonicalizeUrl(url_3.validateUrl(event._currentTarget.href)))).bind(function (url) {
                                return !!!hasModifierKey(event) && isAccessible(url) && !isHashChange(url) && _this.config.filter(event._currentTarget) ? spica_1.Just(0) : spica_1.Nothing;
                            }).fmap(function () {
                                return void event.preventDefault(), initialization_1.init.then(function (_a) {
                                    var scripts = _a[0];
                                    return router_1.route(_this.config, event, {
                                        router: GUI.router,
                                        scripts: scripts,
                                        cancelable: new spica_1.Cancelable()
                                    }, _this.io);
                                });
                            }).extract(function () {
                                return Promise.resolve();
                            }).catch(function () {
                                return void window.location.assign(event._currentTarget.href);
                            });
                        }).close), void GUI.sv.events.exit.once([], new submit_1.SubmitView(_this.io.document, _this.config.form, function (event) {
                            return void spica_1.Just(new url_1.Url(url_2.canonicalizeUrl(url_3.validateUrl(event._currentTarget.action)))).bind(function (url) {
                                return !!!hasModifierKey(event) && isAccessible(url) ? spica_1.Just(0) : spica_1.Nothing;
                            }).fmap(function () {
                                return void event.preventDefault(), initialization_1.init.then(function (_a) {
                                    var scripts = _a[0];
                                    return router_1.route(_this.config, event, {
                                        router: GUI.router,
                                        scripts: scripts,
                                        cancelable: new spica_1.Cancelable()
                                    }, _this.io);
                                });
                            }).extract(function () {
                                return Promise.resolve();
                            }).catch(function () {
                                return void window.location.assign(event._currentTarget.action);
                            });
                        }).close), void GUI.sv.events.exit.once([], new navigation_1.NavigationView(window, function (event) {
                            return void spica_1.Just(new url_1.Url(url_2.canonicalizeUrl(url_3.validateUrl(window.location.href)))).bind(function (url) {
                                return !!isAccessible(url) && !isHashChange(url) ? spica_1.Just(api_2.loadTitle(url.path)) : spica_1.Nothing;
                            }).fmap(function (title) {
                                return title ? io.document.title = title : void 0, initialization_1.init.then(function (_a) {
                                    var scripts = _a[0];
                                    return router_1.route(_this.config, event, {
                                        router: GUI.router,
                                        scripts: scripts,
                                        cancelable: new spica_1.Cancelable()
                                    }, _this.io);
                                });
                            }).extract(function () {
                                return Promise.resolve();
                            }).catch(function () {
                                return void window.location.reload(true);
                            });
                        }).close), void GUI.sv.events.exit.once([], new scroll_1.ScrollView(window, function () {
                            return void spica_1.Just(window).fmap(function (_a) {
                                var left = _a.pageXOffset, top = _a.pageYOffset;
                                return url_4.documentUrl.href === new url_1.Url(url_2.canonicalizeUrl(url_3.validateUrl(window.location.href))).href ? void api_2.savePosition(new url_1.Url(url_4.documentUrl.href).path, {
                                    top: top,
                                    left: left
                                }) : void 0;
                            }).extract();
                        }).close), [
                            void 0,
                            void 0
                        ];
                    }, void 0);
                    void GUI.sv.cast('', void 0);
                }
                GUI.assign = function (url, option, io) {
                    if (io === void 0) {
                        io = { document: window.document };
                    }
                    return void click(url).then(function (event) {
                        return initialization_1.init.then(function (_a) {
                            var scripts = _a[0];
                            return router_1.route(new api_1.Config(option), event, {
                                router: GUI.router,
                                scripts: scripts,
                                cancelable: new spica_1.Cancelable()
                            }, io);
                        });
                    });
                };
                GUI.replace = function (url, option, io) {
                    if (io === void 0) {
                        io = { document: window.document };
                    }
                    return void click(url).then(function (event) {
                        return initialization_1.init.then(function (_a) {
                            var scripts = _a[0];
                            return router_1.route(new api_1.Config(spica_1.extend({}, option, { replace: '*' })), event, {
                                router: GUI.router,
                                scripts: scripts,
                                cancelable: new spica_1.Cancelable()
                            }, io);
                        });
                    });
                };
                GUI.prototype.assign = function (url) {
                    return void GUI.assign(url, this.option, this.io);
                };
                GUI.prototype.replace = function (url) {
                    return void GUI.replace(url, this.option, this.io);
                };
                return GUI;
            }();
            GUI.router = new (function (_super) {
                __extends(class_1, _super);
                function class_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return class_1;
            }(spica_1.Supervisor))();
            GUI.sv = new (function (_super) {
                __extends(class_2, _super);
                function class_2() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return class_2;
            }(spica_1.Supervisor))();
            exports.GUI = GUI;
            function hasModifierKey(event) {
                return event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
            }
            function isAccessible(dest, orig) {
                if (orig === void 0) {
                    orig = new url_1.Url(url_4.documentUrl.href);
                }
                return orig.domain === dest.domain;
            }
            function isHashChange(dest, orig) {
                if (orig === void 0) {
                    orig = new url_1.Url(url_4.documentUrl.href);
                }
                return orig.domain === dest.domain && orig.path === dest.path && orig.hash !== dest.hash;
            }
            function click(url) {
                var el = document.createElement('a');
                el.href = url;
                return new Promise(function (resolve) {
                    return void dom_1.once(el, 'click', function (event) {
                        return void event.preventDefault(), void resolve(event);
                    }), void api_2.parse('').extract().body.appendChild(el), void el.click(), void el.remove();
                });
            }
            exports.click = click;
        },
        {
            '../../../lib/dom': 49,
            '../../../lib/url': 52,
            '../../application/api': 5,
            '../../data/model/canonicalization/url': 9,
            '../../data/model/validation/url': 10,
            '../module/view/click': 37,
            '../module/view/navigation': 38,
            '../module/view/scroll': 39,
            '../module/view/submit': 40,
            '../service/router': 44,
            '../service/state/initialization': 45,
            '../service/state/scroll-restoration': 47,
            '../service/state/url': 48,
            'spica': undefined
        }
    ],
    43: [
        function (require, module, exports) {
            'use strict';
            var bar = document.createElement('div');
            void window.addEventListener('pjax:fetch', function () {
                return void document.documentElement.appendChild(bar);
            });
            void window.addEventListener('pjax:fetch', function () {
                return bar.style.width = '5%';
            });
            void window.addEventListener('pjax:unload', function () {
                return bar.style.width = '80%';
            });
            void document.addEventListener('pjax:ready', function () {
                return bar.style.width = '90%';
            });
            void window.addEventListener('pjax:load', function () {
                return bar.style.width = '100%';
            });
            void window.addEventListener('pjax:load', function () {
                return void bar.remove();
            });
            function progressbar(style) {
                void bar.setAttribute('style', style);
            }
            exports.progressbar = progressbar;
        },
        {}
    ],
    44: [
        function (require, module, exports) {
            'use strict';
            var api_1 = require('../../application/api');
            var url_1 = require('../../data/model/canonicalization/url');
            var url_2 = require('../../data/model/validation/url');
            var url_3 = require('./state/url');
            var progressbar_1 = require('./progressbar');
            var error_1 = require('../data/error');
            function route(config, event, state, io) {
                void state.router.cast('', new error_1.InterfaceError('Abort.'));
                void state.router.register('', function (e) {
                    throw void state.cancelable.cancel(e);
                }, void 0);
                void progressbar_1.progressbar(config.progressbar);
                return api_1.route(config, event, state, io).then(function (m) {
                    return void state.router.terminate(''), void m.bind(state.cancelable.either).fmap(function (ss) {
                        return void ss.forEach(function (s) {
                            return void state.scripts.add(url_1.canonicalizeUrl(url_2.validateUrl(s.src)));
                        }), void url_3.documentUrl.sync();
                    }).extract();
                }).catch(function (e) {
                    return void state.router.terminate(''), void state.cancelable.maybe(void 0).extract(function () {
                        return void 0;
                    }, function () {
                        return void console.error(e), void Promise.reject(config.fallback(event._currentTarget, e));
                    });
                });
            }
            exports.route = route;
        },
        {
            '../../application/api': 5,
            '../../data/model/canonicalization/url': 9,
            '../../data/model/validation/url': 10,
            '../data/error': 36,
            './progressbar': 43,
            './state/url': 48
        }
    ],
    45: [
        function (require, module, exports) {
            'use strict';
            var script_1 = require('./script');
            exports.init = new Promise(setTimeout).then(function () {
                return Promise.all([script_1.scripts]);
            });
        },
        { './script': 46 }
    ],
    46: [
        function (require, module, exports) {
            'use strict';
            var url_1 = require('../../../data/model/canonicalization/url');
            var url_2 = require('../../../data/model/validation/url');
            var dom_1 = require('../../../../lib/dom');
            exports.scripts = new Promise(setTimeout).then(function () {
                return dom_1.find(document, 'script').filter(function (script) {
                    return script.hasAttribute('src');
                }).reduce(function (scripts, script) {
                    return scripts.add(url_1.canonicalizeUrl(url_2.validateUrl(script.src)));
                }, new Set());
            });
        },
        {
            '../../../../lib/dom': 49,
            '../../../data/model/canonicalization/url': 9,
            '../../../data/model/validation/url': 10
        }
    ],
    47: [
        function (require, module, exports) {
            'use strict';
            void setTimeout(function () {
                return window.history.scrollRestoration = 'manual';
            }, 0);
            void window.addEventListener('unload', function () {
                return window.history.scrollRestoration = 'auto';
            }, true);
        },
        {}
    ],
    48: [
        function (require, module, exports) {
            'use strict';
            var spica_1 = require('spica');
            var url_1 = require('../../../data/model/canonicalization/url');
            var url_2 = require('../../../data/model/validation/url');
            var dom_1 = require('../../../../lib/dom');
            var url = url_1.canonicalizeUrl(url_2.validateUrl(location.href));
            var init = url;
            exports.documentUrl = {
                get href() {
                    return url;
                },
                sync: function () {
                    init = undefined;
                    return url = url_1.canonicalizeUrl(url_2.validateUrl(location.href));
                }
            };
            void dom_1.once(window, 'popstate', function () {
                return spica_1.Tick(function () {
                    return init = undefined;
                });
            });
            void dom_1.once(document, 'DOMContentLoaded', function () {
                return void setTimeout(function () {
                    return init = undefined;
                }, 1000);
            });
            function isInvalidPopstateEvent(event) {
                return init === url_1.canonicalizeUrl(url_2.validateUrl(location.href));
            }
            exports.isInvalidPopstateEvent = isInvalidPopstateEvent;
        },
        {
            '../../../../lib/dom': 49,
            '../../../data/model/canonicalization/url': 9,
            '../../../data/model/validation/url': 10,
            'spica': undefined
        }
    ],
    49: [
        function (require, module, exports) {
            'use strict';
            var noop_1 = require('./noop');
            function parse(html) {
                var parser = document.createElement('div');
                parser.innerHTML = html;
                return parser.firstElementChild ? parser.firstElementChild : parser;
            }
            exports.parse = parse;
            function find(el, selector) {
                return Array.from(el.querySelectorAll(selector || '_') || []);
            }
            exports.find = find;
            function bind(el, type, listener, option) {
                if (option === void 0) {
                    option = false;
                }
                void el.addEventListener(type, handler, adjustEventListenerOptions(option));
                var unbind = function () {
                    return unbind = noop_1.noop, void el.removeEventListener(type, handler, adjustEventListenerOptions(option));
                };
                return function () {
                    return void unbind();
                };
                function handler(ev) {
                    ev._currentTarget = ev.currentTarget;
                    if (typeof option === 'object' && option.passive) {
                        ev.preventDefault = noop_1.noop;
                    }
                    void listener(ev);
                }
            }
            exports.bind = bind;
            function once(el, type, listener, option) {
                if (option === void 0) {
                    option = false;
                }
                var unbind = bind(el, type, function (ev) {
                    return void unbind(), unbind = noop_1.noop, void listener(ev);
                }, option);
                return function () {
                    return void unbind();
                };
            }
            exports.once = once;
            function delegate(el, selector, type, listener, option) {
                if (option === void 0) {
                    option = { capture: true };
                }
                return bind(el, type, function (ev) {
                    var cx = ev.target.closest(selector);
                    if (!cx)
                        return;
                    void find(el, selector).filter(function (el) {
                        return el === cx;
                    }).forEach(function (el) {
                        return void once(el, type, function (ev) {
                            return ev._currentTarget = ev.currentTarget, void listener(ev);
                        }, option);
                    });
                }, Object.assign({}, option, { capture: true }));
            }
            exports.delegate = delegate;
            function serialize(form) {
                return Array.from(form.elements).filter(function (el) {
                    return el.name && !el.disabled && (el.checked || !/^(?:checkbox|radio)$/i.test(el.type)) && /^(?:input|select|textarea|keygen)/i.test(el.nodeName) && !/^(?:submit|button|image|reset|file)$/i.test(el.type);
                }).map(function (el) {
                    return [
                        encodeURIComponent(el.name),
                        encodeURIComponent(el.value === null ? '' : el.value.replace(/\r?\n/g, '\r\n'))
                    ].join('=');
                }).join('&');
            }
            exports.serialize = serialize;
            var supportEventListenerOptions = false;
            try {
                document.createElement('div').addEventListener('test', function () {
                }, {
                    get capture() {
                        supportEventListenerOptions = true;
                        return false;
                    }
                });
            } catch (e) {
            }
            function adjustEventListenerOptions(option) {
                return supportEventListenerOptions ? option : typeof option === 'boolean' ? option : option.capture;
            }
        },
        { './noop': 51 }
    ],
    50: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            var PjaxError = function (_super) {
                __extends(PjaxError, _super);
                function PjaxError(msg) {
                    return _super.call(this, 'Pjax: ' + msg) || this;
                }
                return PjaxError;
            }(Error);
            exports.PjaxError = PjaxError;
        },
        {}
    ],
    51: [
        function (require, module, exports) {
            'use strict';
            function noop() {
                return;
            }
            exports.noop = noop;
        },
        {}
    ],
    52: [
        function (require, module, exports) {
            'use strict';
            var Url = function () {
                function Url(url) {
                    this.parser = document.createElement('a');
                    this.URL;
                    this.parser.href = url || location.href;
                    this.parser.setAttribute('href', this.parser.href);
                }
                Object.defineProperty(Url.prototype, 'href', {
                    get: function () {
                        return this.parser.href;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Url.prototype, 'domain', {
                    get: function () {
                        return this.protocol + '//' + this.host;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Url.prototype, 'protocol', {
                    get: function () {
                        return this.parser.protocol;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Url.prototype, 'host', {
                    get: function () {
                        return this.parser.host;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Url.prototype, 'hostname', {
                    get: function () {
                        return this.parser.hostname;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Url.prototype, 'port', {
                    get: function () {
                        return this.parser.port;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Url.prototype, 'path', {
                    get: function () {
                        return '' + this.pathname + this.query;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Url.prototype, 'dir', {
                    get: function () {
                        return this.pathname.split('/').slice(0, -1).concat('').join('/');
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Url.prototype, 'file', {
                    get: function () {
                        return this.pathname.split('/').pop();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Url.prototype, 'pathname', {
                    get: function () {
                        return '' + (this.parser.pathname[0] === '/' ? '' : '/') + this.parser.pathname;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Url.prototype, 'query', {
                    get: function () {
                        return this.parser.search;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Url.prototype, 'hash', {
                    get: function () {
                        return this.parser.hash;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Url;
            }();
            exports.Url = Url;
        },
        {}
    ],
    'pjax-api': [
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
    'pjax-api'
]);