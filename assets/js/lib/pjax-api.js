/*! pjax-api v3.3.3 https://github.com/falsandtru/pjax-api | (c) 2016, falsandtru | GPL-2.0 License */
define = typeof define === 'function' && define.amd
  ? define
  : (function () {
    'use strict';
    var name = 'pjax-api',
        workspace = {};
    return function define(m, rs, f) {
      return !f
        ? void define(name, m, rs)
        : void f.apply(this, rs.map(function (r) {
          switch (r) {
            case 'require': {
              return typeof require === 'function' ? require : void 0;
            }
            case 'exports': {
              return m.indexOf('/') === -1
                ? workspace[m] = typeof exports === 'undefined' ? self[m] = self[m] || {} : exports
                : workspace[m] = workspace.hasOwnProperty(m) ? workspace[m] : {};
            }
            default: {
              return r.slice(-2) === '.d' && {}
                  || workspace.hasOwnProperty(r) && workspace[r]
                  || typeof require === 'function' && require(r)
                  || self[r];
            }
          }
        }));
    };
  })();
var __extends = this && this.__extends || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define('src/lib/url', [
    'require',
    'exports'
], function (require, exports) {
    'use strict';
    var Url = function () {
        function Url(url) {
            this.parser = document.createElement('a');
            this.URL;
            this.parser.href = url + '' || location.href;
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
});
define('src/layer/domain/data/config', [
    'require',
    'exports',
    'spica',
    'src/lib/url'
], function (require, exports, spica_1, url_1) {
    'use strict';
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
                ignore: '[href^="chrome-extension://"], [src*=".kis.scr.kaspersky-labs.com/"]',
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
});
define('src/layer/data/model/validation/url', [
    'require',
    'exports'
], function (require, exports) {
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
});
define('src/layer/data/model/canonicalization/url', [
    'require',
    'exports',
    'src/layer/data/model/validation/url'
], function (require, exports, url_2) {
    'use strict';
    function canonicalizeUrl(url) {
        return url.replace(/(?:%\w{2})+/g, function (str) {
            return str.toUpperCase();
        });
    }
    exports.canonicalizeUrl = canonicalizeUrl;
});
define('src/layer/application/config/scope', [
    'require',
    'exports',
    'spica',
    'src/layer/domain/data/config'
], function (require, exports, spica_2, config_1) {
    'use strict';
    function scope(config, path) {
        return spica_2.Sequence.from(Object.keys(config.scope).sort().reverse()).dropWhile(function (pattern) {
            return !!!compare(path.orig, pattern) && !compare(path.dest, pattern);
        }).take(1).filter(function (pattern) {
            return !!compare(path.orig, pattern) && compare(path.dest, pattern);
        }).map(function (pattern) {
            return config.scope[pattern];
        }).map(function (option) {
            return option ? spica_2.Just(new config_1.Config(spica_2.extend({}, config, option))) : spica_2.Nothing;
        }).extract().reduce(function (_, m) {
            return m;
        }, spica_2.Nothing);
    }
    exports.scope = scope;
    function compare(path, pattern) {
        var regSegment = /\/|[^\/]+\/?/g;
        return spica_2.Sequence.zip(spica_2.Sequence.cycle([path]), spica_2.Sequence.from(expand(pattern))).map(function (_a) {
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
            return spica_2.Sequence.zip(spica_2.Sequence.from(path), spica_2.Sequence.from(pattern)).takeWhile(function (_a) {
                var s = _a[0], p = _a[1];
                return match(s, p);
            }).extract().length === pattern.length;
        }).take(1).extract().length > 0;
    }
    exports.compare = compare;
    function expand(pattern) {
        return spica_2.Sequence.from((pattern.match(/{.*?}|[^{]*/g) || []).map(function (p) {
            return p[0] === '{' ? p.slice(1, -1).split(',') : [p];
        })).mapM(spica_2.Sequence.from).map(function (ps) {
            return ps.join('');
        }).extract();
    }
    exports.expand = expand;
    function match(segment, pattern) {
        return spica_2.Sequence.from(segment.split('')).map(function (c, i) {
            return [
                c,
                i
            ];
        }).scan(function (_a, _b) {
            var s = _a[0], _c = _a[1], p = _c[0], ps = _c.slice(1);
            var c = _b[0], i = _b[1];
            switch (p) {
            case '?':
                return [
                    s + c,
                    ps
                ];
            case '*':
                return ps.length === 0 ? [
                    s + c,
                    i + 1 === segment.length ? [] : [p]
                ] : c === ps[0] ? [
                    s + c,
                    ps.slice(1)
                ] : [
                    s + c,
                    spica_2.concat([p], ps)
                ];
            default:
                return c === p ? [
                    s + c,
                    ps
                ] : [
                    s,
                    []
                ];
            }
        }, [
            '',
            pattern.split('')
        ]).dropWhile(function (_a) {
            var ps = _a[1];
            return ps.length > 0;
        }).map(function (_a) {
            var s = _a[0];
            return s;
        }).take(1).filter(function (s) {
            return s === segment;
        }).extract().length > 0;
    }
    exports.match = match;
});
define('src/lib/dom', [
    'require',
    'exports'
], function (require, exports) {
    'use strict';
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
        return function () {
            return void el.removeEventListener(type, handler, adjustEventListenerOptions(option));
        };
        function handler(ev) {
            ev._currentTarget = ev.currentTarget;
            void listener(ev);
        }
    }
    exports.bind = bind;
    function once(el, type, listener, option) {
        if (option === void 0) {
            option = false;
        }
        var done = false;
        var unbind = bind(el, type, function (ev) {
            return void unbind(), done = true, listener(ev);
        }, adjustEventListenerOptions(option));
        return function () {
            return done ? void 0 : void unbind();
        };
    }
    exports.once = once;
    function delegate(el, selector, type, listener) {
        void el.addEventListener(type, handler, true);
        return function () {
            return void el.removeEventListener(type, handler, true);
        };
        function handler(ev) {
            var cx = ev.target.closest(selector);
            if (!cx)
                return;
            void find(el, selector).filter(function (el) {
                return el === cx;
            }).forEach(function (el) {
                return el.addEventListener(type, handler, false);
            });
            function handler(ev) {
                ev._currentTarget = ev.currentTarget;
                void ev._currentTarget.removeEventListener(type, handler);
                void listener(ev);
            }
        }
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
        window.addEventListener('test', null, Object.defineProperty({}, 'capture', {
            get: function () {
                supportEventListenerOptions = true;
            }
        }));
    } catch (e) {
    }
    function adjustEventListenerOptions(option) {
        return supportEventListenerOptions ? option : option.capture;
    }
});
define('src/layer/domain/event/router', [
    'require',
    'exports',
    'src/lib/url',
    'src/layer/data/model/canonicalization/url',
    'src/layer/data/model/validation/url',
    'src/lib/dom'
], function (require, exports, url_3, url_4, url_5, dom_1) {
    'use strict';
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
    var RouterEvent;
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
                this.source = source;
                this.eventType = eventType;
                this.data = this.method === Method.POST ? new FormData(this.source) : null;
                void this.url;
                void Object.freeze(this);
            }
            Object.defineProperty(Request.prototype, 'method', {
                get: function () {
                    if (this.method_)
                        return this.method_;
                    switch (this.eventType) {
                    case Type.click:
                        return this.method_ = Method.GET;
                    case Type.submit:
                        return this.method_ = this.source.method.toUpperCase() === Method.POST ? Method.POST : Method.GET;
                    case Type.popstate:
                        return this.method_ = Method.GET;
                    default:
                        throw new TypeError();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Request.prototype, 'url', {
                get: function () {
                    if (this.url_)
                        return this.url_;
                    switch (this.eventType) {
                    case Type.click:
                        return this.url_ = url_4.canonicalizeUrl(url_5.validateUrl(this.source.href));
                    case Type.submit:
                        return this.url_ = url_4.canonicalizeUrl(url_5.validateUrl(this.source.method.toUpperCase() === Method.POST ? this.source.action.split(/[?#]/).shift() : this.source.action.split(/[?#]/).shift().concat('?' + dom_1.serialize(this.source))));
                    case Type.popstate:
                        return this.url_ = url_4.canonicalizeUrl(url_5.validateUrl(window.location.href));
                    default:
                        throw new TypeError();
                    }
                },
                enumerable: true,
                configurable: true
            });
            return Request;
        }();
        RouterEvent.Request = Request;
        var Location = function () {
            function Location(target) {
                this.target = target;
                this.orig = new url_3.Url(url_4.canonicalizeUrl(url_5.validateUrl(window.location.href)));
                this.dest = new url_3.Url(this.target);
                void Object.freeze(this);
            }
            return Location;
        }();
        RouterEvent.Location = Location;
    }(RouterEvent = exports.RouterEvent || (exports.RouterEvent = {})));
});
define('src/layer/domain/router/model/eav/entity', [
    'require',
    'exports',
    'src/layer/domain/event/router'
], function (require, exports, router_1) {
    'use strict';
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
    var RouterEntity;
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
});
define('src/layer/domain/router/module/fetch/html', [
    'require',
    'exports',
    'spica',
    'src/lib/dom'
], function (require, exports, spica_3, dom_2) {
    'use strict';
    exports.parse = [
        parseByDoc,
        parseByDOM
    ].reduce(function (m, parser) {
        return m.bind(function () {
            return test(parser) ? spica_3.Left(parser) : m;
        });
    }, spica_3.Right(function () {
        return spica_3.Nothing;
    })).extract(function (parser) {
        return function (html) {
            return spica_3.Just(parser(html));
        };
    });
    function parseByDOM(html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        void fix(doc);
        return doc;
    }
    function parseByDoc(html) {
        var document = window.document.implementation.createHTMLDocument('');
        var title = dom_2.find(dom_2.parse(html.slice(0, html.search(/<\/title>/i) + 8)), 'title').reduce(function (title, el) {
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
        return dom_2.find(doc, 'noscript').filter(function (el) {
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
});
define('src/layer/domain/router/model/eav/value/fetch', [
    'require',
    'exports',
    'src/layer/domain/router/module/fetch/html'
], function (require, exports, html_1) {
    'use strict';
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
});
define('src/lib/error', [
    'require',
    'exports'
], function (require, exports) {
    'use strict';
    var PjaxError = function (_super) {
        __extends(PjaxError, _super);
        function PjaxError(msg) {
            _super.call(this, 'Pjax: ' + msg);
        }
        return PjaxError;
    }(Error);
    exports.PjaxError = PjaxError;
});
define('src/layer/domain/data/error', [
    'require',
    'exports',
    'src/lib/error'
], function (require, exports, error_1) {
    'use strict';
    var DomainError = function (_super) {
        __extends(DomainError, _super);
        function DomainError(msg) {
            _super.call(this, 'Domain: ' + msg);
        }
        return DomainError;
    }(error_1.PjaxError);
    exports.DomainError = DomainError;
});
define('src/layer/domain/router/module/fetch/xhr', [
    'require',
    'exports',
    'spica',
    'src/layer/domain/router/model/eav/value/fetch',
    'src/layer/domain/data/error'
], function (require, exports, spica_4, fetch_1, error_2) {
    'use strict';
    var ContentType = 'text/html';
    function xhr(method, url, data, setting, cancelable) {
        var xhr = new XMLHttpRequest();
        var wait = new Promise(function (resolve) {
            return setTimeout(resolve, setting.wait);
        });
        return new Promise(function (resolve) {
            return void xhr.open(method, url + '', true), xhr.responseType = /chrome|firefox|edge/i.test(window.navigator.userAgent) ? 'document' : 'text', xhr.timeout = setting.timeout, void xhr.setRequestHeader('X-Pjax', '1'), void xhr.send(data), void xhr.addEventListener('abort', function () {
                return void handle(cancelable, function () {
                    return void resolve(spica_4.Left(new error_2.DomainError('Failed to request by abort.')));
                }, function (err) {
                    return void resolve(spica_4.Left(err));
                });
            }), void xhr.addEventListener('error', function () {
                return void handle(cancelable, function () {
                    return void resolve(spica_4.Left(new error_2.DomainError('Failed to request by error.')));
                }, function (err) {
                    return void resolve(spica_4.Left(err));
                });
            }), void xhr.addEventListener('timeout', function () {
                return void handle(cancelable, function () {
                    return void resolve(spica_4.Left(new error_2.DomainError('Failed to request by timeout.')));
                }, function (err) {
                    return void resolve(spica_4.Left(err));
                });
            }), void xhr.addEventListener('load', function () {
                return void handle(cancelable, function () {
                    return void verify(xhr).extract(function (err) {
                        return void resolve(spica_4.Left(err));
                    }, function (xhr) {
                        return void resolve(spica_4.Right(new fetch_1.FetchValue(xhr)));
                    });
                }, function (err) {
                    return void resolve(spica_4.Left(err));
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
        return spica_4.Right(xhr).bind(function (xhr) {
            return match(xhr.getResponseHeader('Content-Type'), ContentType) ? spica_4.Right(xhr) : spica_4.Left(new error_2.DomainError('Faild to validate a content type of response.'));
        });
    }
    exports.verify = verify;
    function match(actualContentType, expectedContentType) {
        return spica_4.Sequence.intersect(spica_4.Sequence.from(parse(actualContentType || '').sort()), spica_4.Sequence.from(parse(expectedContentType).sort()), function (a, b) {
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
});
define('src/layer/domain/router/service/fetch/api', [
    'require',
    'exports',
    'spica',
    'src/layer/domain/router/module/fetch/xhr',
    'src/lib/url'
], function (require, exports, spica_5, xhr_1, url_6) {
    'use strict';
    function fetch(_a, _b, cancelable) {
        var method = _a.method, url = _a.url, data = _a.data;
        var setting = _b.fetch, sequence = _b.sequence;
        return new spica_5.HNil().push(xhr_1.xhr(method, url, data, setting, cancelable)).modify(function (p) {
            return void window.dispatchEvent(new Event('pjax:fetch')), sequence.fetch(void 0, {
                host: '',
                path: new url_6.Url(url).path + '',
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
                return spica_5.Left(e instanceof Error ? e : new Error(e));
            });
        }).head();
    }
    exports.fetch = fetch;
});
define('src/layer/domain/router/model/eav/value/update', [
    'require',
    'exports'
], function (require, exports) {
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
});
define('src/layer/domain/router/module/update/blur', [
    'require',
    'exports'
], function (require, exports) {
    'use strict';
    function blur(document) {
        if (document.activeElement === document.body)
            return;
        void document.activeElement.blur();
        void document.body.focus();
    }
    exports.blur = blur;
});
define('src/layer/domain/router/module/update/url', [
    'require',
    'exports',
    'src/layer/domain/router/model/eav/entity'
], function (require, exports, entity_1) {
    'use strict';
    function url(location, title, type, source, replaceable) {
        switch (true) {
        case isReplaceable(type, source, replaceable):
            return void window.history.replaceState(null, title, location.dest.href + '');
        case isRegisterable(type, location):
            return void window.history.pushState(null, title, location.dest.href + '');
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
});
define('src/layer/domain/router/module/update/title', [
    'require',
    'exports'
], function (require, exports) {
    'use strict';
    function title(document) {
        document.dst.title = document.src.title;
    }
    exports.title = title;
});
define('src/layer/domain/router/module/update/sync', [
    'require',
    'exports',
    'spica'
], function (require, exports, spica_6) {
    'use strict';
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
                return dsts.length === 0 ? link.set(null, spica_6.concat(link.get(null) || [], [src])) : dsts.reduce(function (m, dst) {
                    return m.bind(function (link) {
                        return !link.has(dst) && compare(src, dst) ? (void link.set(dst, spica_6.concat(link.get(null) || [], [src])), void link.delete(null), spica_6.Left(link)) : spica_6.Right(link);
                    });
                }, spica_6.Right(link)).fmap(function (link) {
                    return link.set(null, spica_6.concat(link.get(null) || [], [src]));
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
        return void el.parentElement.removeChild(el);
    }
});
define('src/layer/domain/router/module/update/head', [
    'require',
    'exports',
    'src/layer/domain/router/module/update/sync',
    'src/lib/dom'
], function (require, exports, sync_1, dom_3) {
    'use strict';
    function head(scope, selector, ignore) {
        ignore += selector.indexOf('link') > -1 ? ', link[rel~="stylesheet"]' : '';
        return void sync_1.sync(sync_1.pair(dom_3.find(scope.src, selector).filter(function (el) {
            return !el.matches(ignore.trim() || '_');
        }), dom_3.find(scope.dst, selector).filter(function (el) {
            return !el.matches(ignore.trim() || '_');
        }), compare), scope.dst);
    }
    exports.head = head;
    function compare(a, b) {
        return a.outerHTML === b.outerHTML;
    }
});
define('src/layer/domain/router/module/update/script', [
    'require',
    'exports',
    'spica',
    'src/lib/dom',
    'src/layer/data/model/canonicalization/url',
    'src/layer/data/model/validation/url'
], function (require, exports, spica_7, dom_4, url_7, url_8) {
    'use strict';
    function script(document, skip, selector, cancelable, io) {
        if (io === void 0) {
            io = {
                request: request,
                evaluate: evaluate,
                log: log
            };
        }
        var scripts = dom_4.find(document.src, 'script').filter(function (el) {
            return !el.type || /(?:application|text)\/(?:java|ecma)script/i.test(el.type);
        }).filter(function (el) {
            return !el.matches(selector.ignore.trim() || '_');
        }).filter(function (el) {
            return el.hasAttribute('src') ? !skip.has(url_7.canonicalizeUrl(url_8.validateUrl(el.src))) || el.matches(selector.reload.trim() || '_') : true;
        });
        return new Promise(function (resolve, reject) {
            return void Promise.all(scripts.reduce(function (rs, script) {
                return spica_7.concat(rs, [io.request(script)]);
            }, [])).then(function (rs) {
                return rs.reduce(function (acc, m) {
                    return m.bind(function (res) {
                        return run(acc, res);
                    });
                }, spica_7.Right([]));
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
            var xhr_2 = new XMLHttpRequest();
            void xhr_2.open('GET', script.src, true);
            void xhr_2.send();
            return new Promise(function (resolve) {
                return [
                    'load',
                    'abort',
                    'error',
                    'timeout'
                ].forEach(function (type) {
                    switch (type) {
                    case 'load':
                        return void xhr_2.addEventListener(type, function () {
                            return void resolve(spica_7.Right([
                                script,
                                xhr_2.response
                            ]));
                        });
                    default:
                        return void xhr_2.addEventListener(type, function () {
                            return void resolve(spica_7.Left(new Error(script.src + ': ' + xhr_2.statusText)));
                        });
                    }
                });
            });
        } else {
            return Promise.resolve(spica_7.Right([
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
            return spica_7.Right(script);
        } catch (err) {
            if (script.hasAttribute('src')) {
                void script.dispatchEvent(new Event('error'));
            }
            return spica_7.Left(err);
        }
    }
    exports._evaluate = evaluate;
    function log(script, document) {
        return dom_4.find(document, script.parentElement.id ? '#' + script.parentElement.id : script.parentElement.tagName).slice(-1).reduce(function (_, parent) {
            script = document.importNode(script.cloneNode(true), true);
            var unescape = escape(script);
            void parent.appendChild(script);
            void unescape();
            return true;
        }, false);
    }
    exports._log = log;
});
define('src/layer/domain/router/module/update/content', [
    'require',
    'exports',
    'spica',
    'src/lib/dom',
    'src/layer/domain/router/module/update/script'
], function (require, exports, spica_8, dom_5, script_1) {
    'use strict';
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
            return as.map(load).reduce(spica_8.concat, []);
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
                return void replace(area), dom_5.find(area.src, 'img, iframe, frame').map(wait);
            }).reduce(spica_8.concat, []);
            function replace(area) {
                var unescape = dom_5.find(area.src, 'script').map(script_1.escape).reduce(function (f, g) {
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
            return spica_8.Maybe.mplus(m, sep(document, area).fmap(function (as) {
                return [
                    area,
                    as
                ];
            }));
        }, spica_8.Nothing);
        function sep(document, area) {
            return split(area).reduce(function (acc, area) {
                return acc.bind(function (as) {
                    return pair(area).fmap(function (a) {
                        return spica_8.concat(as, [a]);
                    });
                });
            }, spica_8.Just([]));
            function pair(area) {
                return maybeValid(cons(area));
                function maybeValid(area) {
                    return validate(area) ? spica_8.Just(area) : spica_8.Nothing;
                    function validate(area) {
                        return area.src.length > 0 && area.src.length === area.dst.length;
                    }
                }
                function cons(area) {
                    return {
                        src: dom_5.find(document.src, area),
                        dst: dom_5.find(document.dst, area)
                    };
                }
            }
        }
    }
    exports.separate = separate;
    function match(document, areas) {
        return spica_8.Sequence.from(areas).bind(function (area) {
            return spica_8.Sequence.from(validate(document, area).extract(function () {
                return [];
            }, function (area) {
                return [area];
            }));
        });
        function validate(document, area) {
            return split(area).reduce(function (m, area) {
                return m.bind(function () {
                    return dom_5.find(document, area).length > 0 ? m : spica_8.Nothing;
                });
            }, spica_8.Just(area));
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
                return void dom_5.once(el, type, resolve);
            });
        }));
    }
    exports._wait = wait;
});
define('src/layer/domain/router/module/update/css', [
    'require',
    'exports',
    'src/lib/dom',
    'src/layer/domain/router/module/update/sync'
], function (require, exports, dom_6, sync_2) {
    'use strict';
    function css(scope, ignore) {
        var selector = 'link[rel~="stylesheet"], style';
        return void sync_2.sync(sync_2.pair(dom_6.find(scope.src, selector).filter(function (el) {
            return !el.matches(ignore.trim() || '_');
        }), dom_6.find(scope.dst, selector).filter(function (el) {
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
});
define('src/layer/domain/router/module/update/focus', [
    'require',
    'exports',
    'src/lib/dom'
], function (require, exports, dom_7) {
    'use strict';
    function focus(document) {
        return void dom_7.find(document, 'body, [autofocus]').slice(-1).filter(function (el) {
            return el !== document.activeElement;
        }).forEach(function (el) {
            return void el.focus();
        });
    }
    exports.focus = focus;
});
define('src/layer/domain/router/module/update/scroll', [
    'require',
    'exports',
    'spica',
    'src/layer/domain/router/model/eav/entity',
    'src/lib/url',
    'src/layer/data/model/canonicalization/url',
    'src/layer/data/model/validation/url',
    'src/lib/dom'
], function (require, exports, spica_9, entity_2, url_9, url_10, url_11, dom_8) {
    'use strict';
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
        case entity_2.RouterEntity.Event.Type.click:
            return void (io.hash(document, target.hash, io) || scroll(target));
        case entity_2.RouterEntity.Event.Type.submit:
            return void scroll(target);
        case entity_2.RouterEntity.Event.Type.popstate:
            return void scroll(io.position(new url_9.Url(url_10.canonicalizeUrl(url_11.validateUrl(window.location.href))).path));
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
        return spica_9.Just(hash.split('#').pop() || '').bind(function (hash) {
            return hash.length > 0 ? spica_9.Just(hash) : spica_9.Nothing;
        }).bind(function (hash) {
            return dom_8.find(document, '#' + hash + ', [name="' + hash + '"]').reduce(function (m, el) {
                return m.extract(function () {
                    return spica_9.Just(el);
                }, spica_9.Just);
            }, spica_9.Nothing);
        }).fmap(function (el) {
            return void io.scroll.call(window, window.pageXOffset, window.pageYOffset + el.getBoundingClientRect().top | 0);
        }).extract(function () {
            return false;
        }, function () {
            return true;
        });
    }
    exports.hash = hash;
});
define('src/layer/data/schema/path', [
    'require',
    'exports',
    'src/lib/url'
], function (require, exports, url_12) {
    'use strict';
    var PathSchema = function () {
        function PathSchema() {
            this.host = new url_12.Url('').host;
            this.title = '';
            this.position = {
                top: void 0,
                left: void 0
            };
        }
        return PathSchema;
    }();
    exports.PathSchema = PathSchema;
});
define('src/layer/data/store/path', [
    'require',
    'exports',
    'localsocket',
    'src/layer/data/schema/path',
    'src/lib/url'
], function (require, exports, localsocket_1, path_1, url_13) {
    'use strict';
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
            return sock.link(new url_13.Url(path + '').path, 3 * 24 * 3600 * 1000);
        }
    };
});
define('src/layer/domain/store/path', [
    'require',
    'exports',
    'src/layer/data/store/path'
], function (require, exports, path_2) {
    'use strict';
    function loadTitle(path) {
        return path_2.store.link(path).title;
    }
    exports.loadTitle = loadTitle;
    function saveTitle(path, title) {
        return path_2.store.link(path).title = title;
    }
    exports.saveTitle = saveTitle;
    function loadPosition(path) {
        return path_2.store.link(path).position;
    }
    exports.loadPosition = loadPosition;
    function savePosition(path, position) {
        path_2.store.link(path).position = position;
    }
    exports.savePosition = savePosition;
});
define('src/layer/domain/router/service/update/api', [
    'require',
    'exports',
    'spica',
    'src/layer/domain/router/model/eav/value/update',
    'src/layer/domain/router/module/update/blur',
    'src/layer/domain/router/module/update/url',
    'src/layer/domain/router/module/update/title',
    'src/layer/domain/router/module/update/head',
    'src/layer/domain/router/module/update/content',
    'src/layer/domain/router/module/update/css',
    'src/layer/domain/router/module/update/script',
    'src/layer/domain/router/module/update/focus',
    'src/layer/domain/router/module/update/scroll',
    'src/layer/domain/store/path',
    'src/layer/domain/data/error'
], function (require, exports, spica_10, update_1, blur_1, url_14, title_1, head_1, content_1, css_1, script_2, focus_1, scroll_1, path_3, error_3) {
    'use strict';
    function update(_a, _b, seq, io) {
        var event = _a.event, config = _a.config, state = _a.state;
        var _c = _b.response, headers = _c.headers, document = _c.document;
        var cancelable = state.cancelable;
        var doc = new update_1.UpdateValue({
            src: document,
            dst: io.document
        }).document;
        return new spica_10.HNil().push(Promise.resolve(cancelable.either(seq))).modify(function (p) {
            return p.then(function (m) {
                return m.bind(cancelable.either).fmap(function (seq) {
                    return content_1.separate(doc, config.areas).fmap(function (_a) {
                        var area = _a[0];
                        return void config.rewrite(doc.src, area, '');
                    }).extract(function () {
                        return Promise.resolve(spica_10.Left(new error_3.DomainError('Failed to separate areas.')));
                    }, function () {
                        return void window.dispatchEvent(new Event('pjax:unload')), config.sequence.unload(seq, {
                            headers: headers,
                            document: document
                        }).then(cancelable.either, function (e) {
                            return spica_10.Left(e instanceof Error ? e : new Error(e));
                        });
                    });
                }).extract();
            });
        }).modify(function (p) {
            return p.then(function (m) {
                return m.bind(cancelable.either).fmap(function (seq) {
                    return new spica_10.HNil().push(void 0).modify(function () {
                        return void blur_1.blur(doc.dst);
                    }).modify(function () {
                        return void url_14.url(event.location, doc.src.title, event.type, event.source, config.replace);
                    }).modify(function () {
                        return void path_3.saveTitle(event.location.orig.path, doc.src.title), void path_3.saveTitle(event.location.dest.path, doc.dst.title), void title_1.title(doc);
                    }).modify(function () {
                        return void head_1.head({
                            src: doc.src.head,
                            dst: doc.dst.head
                        }, config.update.head, config.update.ignore);
                    }).modify(function () {
                        return content_1.content(doc, config.areas).extract(function () {
                            return Promise.resolve(spica_10.Left(new error_3.DomainError('Failed to update areas.')));
                        }, function (p) {
                            return p.then(cancelable.either, function (e) {
                                return spica_10.Left(e instanceof Error ? e : new Error(e));
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
                        return config.update.script ? script_2.script(doc, state.scripts, config.update, cancelable) : Promise.resolve(cancelable.either([]));
                    }).extend(function () {
                        return void io.document.dispatchEvent(new Event('pjax:ready')), config.sequence.ready(seq).then(cancelable.either, spica_10.Left);
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
});
define('src/layer/domain/router/service/api', [
    'require',
    'exports',
    'spica',
    'src/layer/domain/router/model/eav/entity',
    'src/layer/domain/router/service/fetch/api',
    'src/layer/domain/router/service/update/api',
    'src/layer/domain/router/module/update/content',
    'src/layer/domain/store/path',
    'src/layer/domain/data/error'
], function (require, exports, spica_11, entity_3, api_1, api_2, content_2, path_4, error_4) {
    'use strict';
    exports.RouterEntity = entity_3.RouterEntity;
    function route(entity, io) {
        return Promise.resolve().then(function () {
            return content_2.match(window.document, entity.config.areas).take(1).extract().length > 0 ? entity.state.cancelable.either(void 0) : spica_11.Left(new error_4.DomainError('Failed to match areas.'));
        }).then(function (m) {
            return m.bind(entity.state.cancelable.either).fmap(function () {
                return api_1.fetch(entity.event.request, entity.config, entity.state.cancelable);
            }).extract(spica_11.Left);
        }).then(function (m) {
            return m.bind(entity.state.cancelable.either).fmap(function (_a) {
                var res = _a[0], seq = _a[1];
                return api_2.update(entity, res, seq, {
                    document: io.document,
                    scroll: window.scrollTo,
                    position: path_4.loadPosition
                });
            }).extract(function (e) {
                return Promise.resolve(spica_11.Left(e));
            });
        });
    }
    exports.route = route;
});
define('src/layer/domain/router/api', [
    'require',
    'exports',
    'src/layer/domain/router/service/api'
], function (require, exports, api_3) {
    'use strict';
    function __export(m) {
        for (var p in m)
            if (!exports.hasOwnProperty(p))
                exports[p] = m[p];
    }
    __export(api_3);
});
define('src/layer/application/data/error', [
    'require',
    'exports',
    'src/lib/error'
], function (require, exports, error_5) {
    'use strict';
    var ApplicationError = function (_super) {
        __extends(ApplicationError, _super);
        function ApplicationError(msg) {
            _super.call(this, 'Application: ' + msg);
        }
        return ApplicationError;
    }(error_5.PjaxError);
    exports.ApplicationError = ApplicationError;
});
define('src/layer/application/store/path', [
    'require',
    'exports',
    'src/layer/domain/store/path'
], function (require, exports, path_5) {
    'use strict';
    exports.loadTitle = path_5.loadTitle;
    exports.savePosition = path_5.savePosition;
});
define('src/layer/application/api', [
    'require',
    'exports',
    'spica',
    'src/layer/domain/data/config',
    'src/layer/application/config/scope',
    'src/layer/domain/event/router',
    'src/layer/domain/router/api',
    'src/layer/application/data/error',
    'src/layer/application/store/path',
    'src/layer/domain/router/module/fetch/html'
], function (require, exports, spica_12, config_2, scope_1, router_2, api_4, error_6, path_6, html_2) {
    'use strict';
    function __export(m) {
        for (var p in m)
            if (!exports.hasOwnProperty(p))
                exports[p] = m[p];
    }
    exports.Config = config_2.Config;
    function route(config, event, state, io) {
        var location = new router_2.RouterEvent(event).location;
        return scope_1.scope(config, {
            orig: location.orig.pathname,
            dest: location.dest.pathname
        }).extract(function () {
            return Promise.resolve(spica_12.Left(new error_6.ApplicationError('Disabled to use pjax by config.')));
        }, function (config) {
            return api_4.route(new api_4.RouterEntity(new router_2.RouterEvent(event), config, new api_4.RouterEntity.State(state.scripts, state.cancelable)), io);
        });
    }
    exports.route = route;
    __export(path_6);
    exports.parse = html_2.parse;
});
define('src/layer/interface/module/view/click', [
    'require',
    'exports',
    'spica',
    'src/lib/dom'
], function (require, exports, spica_13, dom_9) {
    'use strict';
    var ClickView = function () {
        function ClickView(document, selector, listener) {
            var _this = this;
            this.sv = new (function (_super) {
                __extends(class_2, _super);
                function class_2() {
                    _super.apply(this, arguments);
                }
                return class_2;
            }(spica_13.Supervisor))();
            this.close = function () {
                return void _this.sv.terminate();
            };
            void this.sv.register('', function () {
                return [
                    void _this.sv.events.exit.once([], dom_9.delegate(document.documentElement, selector, 'click', listener)),
                    void 0
                ];
            }, void 0);
            void this.sv.cast('', void 0);
        }
        return ClickView;
    }();
    exports.ClickView = ClickView;
});
define('src/layer/interface/module/view/submit', [
    'require',
    'exports',
    'spica',
    'src/lib/dom'
], function (require, exports, spica_14, dom_10) {
    'use strict';
    var SubmitView = function () {
        function SubmitView(document, selector, listener) {
            var _this = this;
            this.sv = new (function (_super) {
                __extends(class_3, _super);
                function class_3() {
                    _super.apply(this, arguments);
                }
                return class_3;
            }(spica_14.Supervisor))();
            this.close = function () {
                return void _this.sv.terminate();
            };
            void this.sv.register('', function () {
                return [
                    void _this.sv.events.exit.once([], dom_10.delegate(document.documentElement, selector, 'submit', listener)),
                    void 0
                ];
            }, void 0);
            void this.sv.cast('', void 0);
        }
        return SubmitView;
    }();
    exports.SubmitView = SubmitView;
});
define('src/layer/interface/module/view/navigation', [
    'require',
    'exports',
    'spica',
    'src/lib/dom'
], function (require, exports, spica_15, dom_11) {
    'use strict';
    var NavigationView = function () {
        function NavigationView(window, listener) {
            var _this = this;
            this.sv = new (function (_super) {
                __extends(class_4, _super);
                function class_4() {
                    _super.apply(this, arguments);
                }
                return class_4;
            }(spica_15.Supervisor))();
            this.close = function () {
                return void _this.sv.terminate();
            };
            void this.sv.register('', function () {
                return [
                    void _this.sv.events.exit.once([], dom_11.bind(window, 'popstate', listener)),
                    void 0
                ];
            }, void 0);
            void this.sv.cast('', void 0);
        }
        return NavigationView;
    }();
    exports.NavigationView = NavigationView;
});
define('src/layer/interface/module/view/scroll', [
    'require',
    'exports',
    'spica',
    'src/lib/dom'
], function (require, exports, spica_16, dom_12) {
    'use strict';
    var ScrollView = function () {
        function ScrollView(window, listener) {
            var _this = this;
            this.sv = new (function (_super) {
                __extends(class_5, _super);
                function class_5() {
                    _super.apply(this, arguments);
                }
                return class_5;
            }(spica_16.Supervisor))();
            this.close = function () {
                return void _this.sv.terminate();
            };
            var timer = 0;
            void this.sv.register('', function () {
                return [
                    void _this.sv.events.exit.once([], dom_12.bind(window, 'scroll', function (event) {
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
});
define('src/layer/interface/service/state/script', [
    'require',
    'exports',
    'src/layer/data/model/canonicalization/url',
    'src/layer/data/model/validation/url',
    'src/lib/dom'
], function (require, exports, url_15, url_16, dom_13) {
    'use strict';
    exports.scripts = new Promise(setTimeout).then(function () {
        return dom_13.find(document, 'script').filter(function (script) {
            return script.hasAttribute('src');
        }).reduce(function (scripts, script) {
            return scripts.add(url_15.canonicalizeUrl(url_16.validateUrl(script.src)));
        }, new Set());
    });
});
define('src/layer/interface/service/state/initialization', [
    'require',
    'exports',
    'src/layer/interface/service/state/script'
], function (require, exports, script_3) {
    'use strict';
    exports.init = new Promise(setTimeout).then(function () {
        return Promise.all([script_3.scripts]);
    });
});
define('src/layer/interface/service/state/url', [
    'require',
    'exports',
    'src/layer/data/model/canonicalization/url',
    'src/layer/data/model/validation/url'
], function (require, exports, url_17, url_18) {
    'use strict';
    var url = url_17.canonicalizeUrl(url_18.validateUrl(location.href));
    exports.documentUrl = {
        get href() {
            return url;
        },
        sync: function () {
            return url = url_17.canonicalizeUrl(url_18.validateUrl(location.href));
        }
    };
});
void setTimeout(function () {
    return window.history.scrollRestoration = 'manual';
}, 0);
void window.addEventListener('unload', function () {
    return window.history.scrollRestoration = 'auto';
}, true);
define('src/layer/interface/service/progressbar', [
    'require',
    'exports'
], function (require, exports) {
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
});
define('src/layer/interface/data/error', [
    'require',
    'exports',
    'src/lib/error'
], function (require, exports, error_7) {
    'use strict';
    var InterfaceError = function (_super) {
        __extends(InterfaceError, _super);
        function InterfaceError(msg) {
            _super.call(this, 'Interface: ' + msg);
        }
        return InterfaceError;
    }(error_7.PjaxError);
    exports.InterfaceError = InterfaceError;
});
define('src/layer/interface/service/router', [
    'require',
    'exports',
    'spica',
    'src/layer/application/api',
    'src/layer/data/model/canonicalization/url',
    'src/layer/data/model/validation/url',
    'src/layer/interface/service/state/url',
    'src/layer/interface/service/progressbar',
    'src/layer/interface/data/error'
], function (require, exports, spica_17, api_5, url_19, url_20, url_21, progressbar_1, error_8) {
    'use strict';
    var router = new (function (_super) {
        __extends(class_6, _super);
        function class_6() {
            _super.apply(this, arguments);
        }
        return class_6;
    }(spica_17.Supervisor))();
    function route(config, event, state, io) {
        void router.cast('', new error_8.InterfaceError('Abort.'));
        void router.register('', function (e) {
            throw void state.cancelable.cancel(e);
        }, void 0);
        void progressbar_1.progressbar(config.progressbar);
        return api_5.route(config, event, state, io).then(function (m) {
            return void router.terminate(''), void m.bind(state.cancelable.either).fmap(function (ss) {
                return void ss.forEach(function (s) {
                    return void state.scripts.add(url_19.canonicalizeUrl(url_20.validateUrl(s.src)));
                }), void url_21.documentUrl.sync();
            }).extract();
        }).catch(function (e) {
            return void router.terminate(''), void state.cancelable.maybe(void 0).extract(function () {
                return void 0;
            }, function () {
                return void console.error(e), void Promise.reject(config.fallback(event._currentTarget, e));
            });
        });
    }
    exports.route = route;
});
define('src/layer/interface/service/gui', [
    'require',
    'exports',
    'spica',
    'src/layer/application/api',
    'src/lib/url',
    'src/layer/data/model/canonicalization/url',
    'src/layer/data/model/validation/url',
    'src/layer/interface/module/view/click',
    'src/layer/interface/module/view/submit',
    'src/layer/interface/module/view/navigation',
    'src/layer/interface/module/view/scroll',
    'src/layer/interface/service/state/initialization',
    'src/layer/interface/service/state/url',
    'src/layer/interface/service/router',
    'src/layer/application/api',
    'src/lib/dom',
    '../service/state/scroll-restoration'
], function (require, exports, spica_18, api_6, url_22, url_23, url_24, click_1, submit_1, navigation_1, scroll_2, initialization_1, url_25, router_3, api_7, dom_14) {
    'use strict';
    var router = new (function (_super) {
        __extends(class_7, _super);
        function class_7() {
            _super.apply(this, arguments);
        }
        return class_7;
    }(spica_18.Supervisor))();
    var GUI = function () {
        function GUI(option, io) {
            var _this = this;
            if (io === void 0) {
                io = { document: window.document };
            }
            this.option = option;
            this.io = io;
            this.config = new api_6.Config(this.option);
            void GUI.sv.terminate('');
            void GUI.sv.register('', function () {
                return [
                    void GUI.sv.events.exit.once([], new click_1.ClickView(_this.io.document, _this.config.link, function (event) {
                        return void spica_18.Just(new url_22.Url(url_23.canonicalizeUrl(url_24.validateUrl(event._currentTarget.href)))).bind(function (url) {
                            return !!!hasModifierKey(event) && isAccessible(url) && !isHashChange(url) && _this.config.filter(event._currentTarget) ? spica_18.Just(0) : spica_18.Nothing;
                        }).fmap(function () {
                            return void event.preventDefault(), initialization_1.init.then(function (_a) {
                                var scripts = _a[0];
                                return router_3.route(_this.config, event, {
                                    router: router,
                                    scripts: scripts,
                                    cancelable: new spica_18.Cancelable()
                                }, _this.io);
                            });
                        }).extract(function () {
                            return Promise.resolve();
                        }).catch(function () {
                            return void window.location.assign(event._currentTarget.href);
                        });
                    }).close),
                    void GUI.sv.events.exit.once([], new submit_1.SubmitView(_this.io.document, _this.config.form, function (event) {
                        return void spica_18.Just(new url_22.Url(url_23.canonicalizeUrl(url_24.validateUrl(event._currentTarget.action)))).bind(function (url) {
                            return !!!hasModifierKey(event) && isAccessible(url) ? spica_18.Just(0) : spica_18.Nothing;
                        }).fmap(function () {
                            return void event.preventDefault(), initialization_1.init.then(function (_a) {
                                var scripts = _a[0];
                                return router_3.route(_this.config, event, {
                                    router: router,
                                    scripts: scripts,
                                    cancelable: new spica_18.Cancelable()
                                }, _this.io);
                            });
                        }).extract(function () {
                            return Promise.resolve();
                        }).catch(function () {
                            return void window.location.assign(event._currentTarget.action);
                        });
                    }).close),
                    void GUI.sv.events.exit.once([], new navigation_1.NavigationView(window, function (event) {
                        return void spica_18.Just(new url_22.Url(url_23.canonicalizeUrl(url_24.validateUrl(window.location.href)))).bind(function (url) {
                            return !!isAccessible(url) && !isHashChange(url) ? spica_18.Just(api_7.loadTitle(url.path)) : spica_18.Nothing;
                        }).fmap(function (title) {
                            return title ? io.document.title = title : void 0, initialization_1.init.then(function (_a) {
                                var scripts = _a[0];
                                return router_3.route(_this.config, event, {
                                    router: router,
                                    scripts: scripts,
                                    cancelable: new spica_18.Cancelable()
                                }, _this.io);
                            });
                        }).extract(function () {
                            return Promise.resolve();
                        }).catch(function () {
                            return void window.location.reload(true);
                        });
                    }).close),
                    void GUI.sv.events.exit.once([], new scroll_2.ScrollView(window, function () {
                        return void spica_18.Just(window).fmap(function (_a) {
                            var left = _a.pageXOffset, top = _a.pageYOffset;
                            return url_25.documentUrl.href === new url_22.Url(url_23.canonicalizeUrl(url_24.validateUrl(window.location.href))).href ? void api_7.savePosition(new url_22.Url(url_25.documentUrl.href).path, {
                                top: top,
                                left: left
                            }) : void 0;
                        }).extract();
                    }).close),
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
                    return router_3.route(new api_6.Config(option), event, {
                        router: router,
                        scripts: scripts,
                        cancelable: new spica_18.Cancelable()
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
                    return router_3.route(new api_6.Config(spica_18.extend({}, option, { replace: '*' })), event, {
                        router: router,
                        scripts: scripts,
                        cancelable: new spica_18.Cancelable()
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
        GUI.sv = new (function (_super) {
            __extends(class_8, _super);
            function class_8() {
                _super.apply(this, arguments);
            }
            return class_8;
        }(spica_18.Supervisor))();
        return GUI;
    }();
    exports.GUI = GUI;
    function hasModifierKey(event) {
        return event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    }
    function isAccessible(dest, orig) {
        if (orig === void 0) {
            orig = new url_22.Url(url_25.documentUrl.href);
        }
        return orig.domain === dest.domain;
    }
    function isHashChange(dest, orig) {
        if (orig === void 0) {
            orig = new url_22.Url(url_25.documentUrl.href);
        }
        return orig.domain === dest.domain && orig.path === dest.path && orig.hash !== dest.hash;
    }
    function click(url) {
        var el = document.createElement('a');
        el.href = url;
        return new Promise(function (resolve) {
            return void dom_14.once(el, 'click', function (event) {
                return void event.preventDefault(), void resolve(event);
            }), void api_7.parse('').extract().body.appendChild(el), void el.click(), void el.remove();
        });
    }
    exports.click = click;
});
define('src/layer/interface/service/api', [
    'require',
    'exports',
    'src/layer/interface/service/gui'
], function (require, exports, gui_1) {
    'use strict';
    exports.API = gui_1.GUI;
});
define('src/export', [
    'require',
    'exports',
    'src/layer/interface/service/api',
    'src/layer/interface/service/api'
], function (require, exports, api_8, api_9) {
    'use strict';
    exports.Pjax = api_8.API;
    exports.default = api_9.API;
});
define('pjax-api', [
    'require',
    'exports',
    'src/export',
    'src/export',
    './src/import'
], function (require, exports, export_1, export_2) {
    'use strict';
    function __export(m) {
        for (var p in m)
            if (!exports.hasOwnProperty(p))
                exports[p] = m[p];
    }
    __export(export_1);
    exports.default = export_2.default;
});