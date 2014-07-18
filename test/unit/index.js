
mocha.setup('tdd');
mocha.setup('bdd');
var assert = chai.assert;
//expectの機能を読み込み
var expect = chai.expect;
//shouldの機能を読み込み
chai.Should();

mocha.checkLeaks();
mocha.globals(['jQuery*']);

window.onload = typeof __karma__ === 'undefined' && function() {
  mocha.run();
};

document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/core.js" charset="utf-8"><\/script>');
document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/event.js" charset="utf-8"><\/script>');

document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/fallback.js" charset="utf-8"><\/script>');
document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/area.js" charset="utf-8"><\/script>');
document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/link.js" charset="utf-8"><\/script>');
document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/filter.js" charset="utf-8"><\/script>');
document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/cache.js" charset="utf-8"><\/script>');
document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/scope.js" charset="utf-8"><\/script>');

document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/disable.js" charset="utf-8"><\/script>');
document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/enable.js" charset="utf-8"><\/script>');
document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/click.js" charset="utf-8"><\/script>');
document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/getCache.js" charset="utf-8"><\/script>');
document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/setCache.js" charset="utf-8"><\/script>');
document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/removeCache.js" charset="utf-8"><\/script>');
document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/clearCache.js" charset="utf-8"><\/script>');

/*
suite("Module", function () {
  this.timeout(5000);
  test("pjax", function (done) {
    var iframe = $('<iframe/>', { 'class': "fixture" }).width(1024).height(960).appendTo('body')[0];
    var url = iframe.src = (window.__karma__ ? "/base/test/" : "./") + "../demo/falsandtru/index.html";

    iframe.onload = function () {
      var window, document, defer;

      $.Deferred().resolve()
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;

        assert.equal(!!window.$.pjax, true, "jQueryに登録");
        assert.equal(!!window.$().pjax, true, "jQueryオブジェクトに登録");

        assert.equal(window.$.pjax()[0], window.document, "コンテキストを自動設定");

        assert.equal(!!window.$.pjax.disable, true, "$.pjax.function");
        assert.equal(!!window.$.pjax().disable, true, "$.pjax().function");
        assert.equal(!!window.$().pjax.disable, true, "$().pjax.function");
        assert.equal(!!window.$().pjax().disable, true, "$().pjax().function");

        assert.equal($('#primary p:first', document).text(), 'primary1', "page1");

        assert.equal(!!window.$.pjax.disable(), true, "$.pjax.disable()");

        defer = $.Deferred();
        setTimeout(defer.resolve, 1000);
        window.$(window).one('pjax.load', function () { setTimeout(defer.reject, 0); });
        window.$('#primary a:eq(2)', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        defer = $.Deferred();
        iframe.onload = defer.resolve;
        window.location.href = url;

        return defer;
      })
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;

        assert.equal($('#primary p:first', document).text(), 'primary2', "page2");

        assert.equal(!!window.$.pjax.enable(), true, "$.pjax.enable()");

        defer = $.Deferred();
        window.$(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });

        window.$('#primary a:eq(3)', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        assert.equal($('#primary p:first', document).text(), 'primary3', "page3");

        defer = $.Deferred();
        window.$(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });

        assert.equal(!!window.$.pjax.click(window.$('#primary a:eq(1)', document)[0].href), true, "$.pjax.click()");

        return defer;
      })
      .pipe(function () {
        assert.equal($('#primary p:first', document).text(), 'primary1', "page1");

        defer = $.Deferred();
        window.$(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });

        assert.equal(!!window.$.pjax.click(window.$('#primary a:eq(2)', document)[0]), true, "$.pjax.click()");

        return defer;
      })
      .pipe(function () {
        assert.equal($('#primary p:first', document).text(), 'primary2', "page2");

        defer = $.Deferred();
        window.$(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });

        assert.equal(!!window.$.pjax.click(window.$('#primary a:eq(3)', document)), true, "$.pjax.click()");

        return defer;
      })
      .pipe(function () {
        assert.equal($('#primary p:first', document).text(), 'primary3', "page3");

        assert.equal(!!window.$.pjax.getCache().XMLHttpRequest, true, "$.pjax.getCache()");

        assert.equal(!!window.$.pjax.removeCache(), true, "$.pjax.removeCache()");
        assert.equal(!!window.$.pjax.getCache(), false, "$.pjax.getCache()");

        assert.equal(!!window.$.pjax.setCache(), true, "$.pjax.setCache()");
        assert.equal(!!window.$.pjax.getCache().data, true, "$.pjax.getCache()");

        assert.equal(!!window.$.pjax.removeCache(), true, "$.pjax.clearCache()");
        assert.equal(!!window.$.pjax.getCache(), false, "$.pjax.getCache()");

        defer = $.Deferred();
        window.$(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        window.history.back();

        return defer;
      })
      .pipe(function () {
        assert.equal($('#primary p:first', document).text(), 'primary2', "page2");

        done();
      });
    };
  });
});

suite("Basic", function () {
  this.timeout(5000);
  test("check", function (done) {
    var iframe = $('<iframe/>', { 'class': "fixture" }).width(1024).height(960).appendTo('body')[0];
    var url = iframe.src = (window.__karma__ ? "/base/test/" : "./") + "../demo/area/index.html";

    iframe.onload = function () {
      var window, document, defer;

      $.Deferred().resolve()
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;

        assert.ok(1, 'page1');
        assert.equal(document.title, 'pjax demo1', "title");
        assert.equal($('#header p:first', document).text(), 'header1', "header");
        assert.equal($('#primary p:first', document).text(), 'primary1', "primary");
        assert.equal($('#secondary p:first', document).text(), 'secondary1', "secondary");
        assert.equal($('#tertiary p:first', document).text(), 'tertiary1', "tertiary");

        defer = $.Deferred();
        window.$(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        window.$('#primary a:eq(1)', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        assert.ok(1, 'page2');
        assert.equal(url, window.location.href, "url");
        assert.equal(document.title, 'pjax demo2', "title");
        assert.equal($('#header p:first', document).text(), 'header1', "header");
        assert.equal($('#primary p:first', document).text(), 'primary2', "primary");
        assert.equal($('#secondary p:first', document).text(), 'secondary1', "secondary");
        assert.equal($('#tertiary p:first', document).text(), 'tertiary2', "tertiary");
        assert.equal($('#primary div', document).length, 2, "length");

        defer = $.Deferred();
        window.$(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        window.$('#primary a:eq(2)', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        assert.ok(1, 'page3');
        assert.equal(url, window.location.href, "url");
        assert.equal(document.title, 'pjax demo3', "title");
        assert.equal($('#header p:first', document).text(), 'header1', "header");
        assert.equal($('#primary p:first', document).text(), 'primary3', "primary");
        assert.equal($('#secondary p:first', document).text(), 'secondary1', "secondary");
        assert.equal($('#tertiary p:first', document).text(), 'tertiary3', "tertiary");

        defer = $.Deferred();
        window.$(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        window.history.back();

        return defer;
      })
      .pipe(function () {
        assert.ok(1, 'page2');
        assert.equal(document.title, 'pjax demo2', "title");
        assert.equal($('#header p:first', document).text(), 'header1', "header");
        assert.equal($('#primary p:first', document).text(), 'primary2', "primary");
        assert.equal($('#secondary p:first', document).text(), 'secondary1', "secondary");
        assert.equal($('#tertiary p:first', document).text(), 'tertiary2', "tertiary");

        defer = $.Deferred();
        window.$(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        window.history.back();

        return defer;
      })
      .pipe(function () {
        assert.ok(1, 'page1');
        assert.equal(document.title, 'pjax demo1', "title");
        assert.equal($('#header p:first', document).text(), 'header1', "header");
        assert.equal($('#primary p:first', document).text(), 'primary1', "primary");
        assert.equal($('#secondary p:first', document).text(), 'secondary1', "secondary");
        assert.equal($('#tertiary p:first', document).text(), 'tertiary1', "tertiary");

        done();
      });
    };
  });
});

!/github|travis|localhost|\d+(\.\d+){3}/.test(window.location.host) &&
suite("Form", function () {
  this.timeout(5000);
  test("check", function (done) {
    var iframe = $('<iframe/>', { 'class': "fixture" }).width(1024).height(960).appendTo('body')[0];
    var url = iframe.src = (window.__karma__ ? "/base/test/" : "./") + "../demo/form/index.html";

    iframe.onload = function () {
      var window, document, defer;

      $.Deferred().resolve()
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;

        assert.ok(1, 'page1');
        assert.equal(document.title, 'pjax demo1', "title");
        assert.equal($('#header p:first', document).text(), 'header1', "header");
        assert.equal($('#primary p:first', document).text(), 'primary1', "primary");

        defer = $.Deferred();
        window.$(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        window.$(document.forms[0]).each(function () { url = this.action; }).submit();

        return defer;
      })
      .pipe(function () {
        assert.ok(1, 'page2');
        assert.equal(url, window.location.href, "url");
        assert.equal(document.title, 'pjax demo2', "title");
        assert.equal($('#header p:first', document).text(), 'header1', "header");
        assert.equal($('#primary p:first', document).text(), 'primary2', "primary");
        assert.equal($('#primary p:last', document).text(), 'pjaxGET送信テスト', "primary");

        defer = $.Deferred();
        window.$(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        window.$(document.forms[1]).each(function () { url = this.action; }).submit();

        return defer;
      })
      .pipe(function () {
        assert.ok(1, 'page3');
        assert.equal(document.title, 'pjax demo1', "title");
        assert.equal($('#header p:first', document).text(), 'header1', "header");
        assert.equal($('#primary p:first', document).text(), 'primary3', "primary");
        assert.equal($('#primary p:last', document).text(), 'pjaxPOST送信テスト', "primary");

        defer = $.Deferred();
        window.$(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        window.history.back();

        return defer;
      })
      .pipe(function () {
        assert.ok(1, 'page2');
        assert.equal(url, window.location.href, "url");
        assert.equal(document.title, 'pjax demo2', "title");
        assert.equal($('#header p:first', document).text(), 'header1', "header");
        assert.equal($('#primary p:first', document).text(), 'primary2', "primary");
        assert.equal($('#primary p:last', document).text(), 'pjaxGET送信テスト', "primary");

        defer = $.Deferred();
        window.$(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        window.$(document.forms[2]).each(function () { url = this.action; }).submit();

        return defer;
      })
      .pipe(function () {
        assert.ok(1, 'page4');
        assert.equal(url, window.location.href, "url");
        assert.equal(document.title, 'pjax demo4', "title");
        assert.equal($('#header p:first', document).text(), 'header4', "header");
        assert.equal($('#primary p:first', document).text(), 'primary4', "primary");
        assert.equal($('#primary p:last', document).text(), '通常GET送信テスト', "primary");

        defer = $.Deferred();
        window.$(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        window.$(document.forms[3]).each(function () { url = this.action; }).submit();

        return defer;
      })
      .pipe(function () {
        assert.ok(1, 'page5');
        assert.equal(url, window.location.href, "url");
        assert.equal(document.title, 'pjax demo5', "title");
        assert.equal($('#header p:first', document).text(), 'header5', "header");
        assert.equal($('#primary p:first', document).text(), 'primary5', "primary");
        assert.equal($('#primary p:last', document).text(), '通常POST送信テスト', "primary");

        done();
      });
    };
  });
});

suite("Hash", function () {
  this.timeout(5000);
  test("check", function (done) {
    var iframe = $('<iframe/>', { 'class': "fixture" }).width(1024).height(960).appendTo('body')[0];
    var url = iframe.src = (window.__karma__ ? "/base/test/" : "./") + "../demo/hash/index.html";

    iframe.onload = function () {
      var window, document, defer;

      $.Deferred().resolve()
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;

        assert.ok(1, 'page1');
        assert.equal(document.title, 'pjax demo1', "title");
        assert.equal(window.$(window).scrollTop(), 0, "scroll");

        defer = $.Deferred();
        window.$(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        window.$('#primary a:eq(1)', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        assert.ok(1, 'page2');
        assert.equal(url, window.location.href, "url");
        assert.equal(document.title, 'pjax demo2', "title");
        assert.notEqual(window.$(window).scrollTop(), 0, "scroll");

        defer = $.Deferred();
        window.$(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        window.history.back();

        return defer;
      })
      .pipe(function () {
        assert.ok(1, 'page1');
        assert.equal(document.title, 'pjax demo1', "title");
        assert.equal(window.$(window).scrollTop(), 0, "scroll");

        done();
      });
    };
  });
});

suite("Cache", function () {
  this.timeout(5000);
  test("check", function (done) {
    var iframe = $('<iframe/>', { 'class': "fixture" }).width(1024).height(960).appendTo('body')[0];
    var url = iframe.src = (window.__karma__ ? "/base/test/" : "./") + "../demo/falsandtru/index.html";

    iframe.onload = function () {
      var window, document, defer;

      $.Deferred().resolve()
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;

        assert.ok(1, 'page1');
        assert.equal(document.title, 'pjax demo1', "title");
        assert.equal($('#header p:first', document).text(), 'header1', "header");
        assert.equal($('#primary p:first', document).text(), 'primary1', "primary");

        defer = $.Deferred();
        window.$(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        window.$('#primary a:eq(2)', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        assert.ok(1, 'page2');
        assert.equal(url, window.location.href, "url");
        assert.equal(document.title, 'pjax demo2', "title");
        assert.equal($('#header p:first', document).text(), 'header1', "header");
        assert.equal($('#primary p:first', document).text(), 'primary2', "primary");

        defer = $.Deferred();
        window.$(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        window.history.back();

        return defer;
      })
      .pipe(function () {
        assert.ok(1, 'page1');
        assert.equal(document.title, 'pjax demo1', "title");
        assert.equal($('#header p:first', document).text(), 'header1', "header");
        assert.equal($('#primary p:first', document).text(), 'primary1', "primary");

        done();
      });
    };
  });
});

suite("Choose", function () {
  this.timeout(5000);
  test("check", function (done) {
    var iframe = $('<iframe/>', { 'class': "fixture" }).width(1024).height(960).appendTo('body')[0];
    var url = iframe.src = (window.__karma__ ? "/base/test/" : "./") + "../demo/choose/index.html";

    iframe.onload = function () {
      var window, document, defer;

      $.Deferred().resolve()
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;

        assert.ok(1, 'page1');
        assert.equal(document.title, 'pjax demo1', "title");
        assert.equal($('#header p:first', document).text(), 'header1', "header");
        assert.equal($('#primary p:first', document).text(), 'primary1', "primary");
        assert.equal($('#secondary p:first', document).text(), 'secondary1', "secondary");
        assert.equal($('#tertiary p:first', document).text(), 'tertiary1', "tertiary");

        defer = $.Deferred();
        window.$(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        window.$('#primary a:eq(1)', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        assert.ok(1, 'page2');
        assert.equal(url, window.location.href, "url");
        assert.equal(document.title, 'pjax demo2', "title");
        assert.equal($('#header p:first', document).text(), 'header1', "header");
        assert.equal($('#primary p:first', document).text(), 'primary1', "primary");
        assert.equal($('#secondary p:first', document).text(), 'secondary2', "secondary");
        assert.equal($('#tertiary p:first', document).text(), 'tertiary1', "tertiary");

        defer = $.Deferred();
        window.$(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        window.$('#primary a:eq(2)', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        assert.ok(1, 'page3');
        assert.equal(document.title, 'pjax demo3', "title");
        assert.equal($('#header p:first', document).text(), 'header1', "header");
        assert.equal($('#primary p:first', document).text(), 'primary3', "primary");
        assert.equal($('#secondary p:first', document).text(), 'secondary2', "secondary");
        assert.equal($('#tertiary p:first', document).text(), 'tertiary1', "tertiary");

        done();
      });
    };
  });
});

suite("CSS", function () {
  this.timeout(5000);
  test("check", function (done) {
    var iframe = $('<iframe/>', { 'class': "fixture" }).width(1024).height(960).appendTo('body')[0];
    var url = iframe.src = (window.__karma__ ? "/base/test/" : "./") + "../demo/css/index.html";

    iframe.onload = function () {
      var window, document, defer;

      $.Deferred().resolve()
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;

        assert.ok(1, 'page1');
        assert.equal(document.title, 'pjax demo1', "title");
        assert.equal($('#header p:first', document).text(), 'header1', "header");
        assert.equal($('#primary p:first', document).text(), 'primary1', "primary");
        assert.equal($('#header', document).css('background-color').toLowerCase(), 'rgb(238, 238, 0)', "css");

        defer = $.Deferred();
        window.$(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        window.$('#primary a:eq(1)', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        assert.ok(1, 'page2');
        assert.equal(url, window.location.href, "url");
        assert.equal(document.title, 'pjax demo2', "title");
        assert.equal($('#header p:first', document).text(), 'header1', "header");
        assert.equal($('#primary p:first', document).text(), 'primary2', "primary");
        assert.equal($('#header', document).css('background-color').toLowerCase(), 'rgb(238, 0, 0)', "css");

        defer = $.Deferred();
        window.$(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        window.history.back();

        return defer;
      })
      .pipe(function () {
        assert.ok(1, 'page1');
        assert.equal(document.title, 'pjax demo1', "title");
        assert.equal($('#header p:first', document).text(), 'header1', "header");
        assert.equal($('#primary p:first', document).text(), 'primary1', "primary");
        assert.equal($('#header', document).css('background-color').toLowerCase(), 'rgb(238, 238, 0)', "css");

        done();
      });
    };
  });
});

suite("Scroll", function () {
  this.timeout(5000);
  test("check", function (done) {
    var iframe = $('<iframe/>', { 'class': "fixture" }).width(1024).height(960).appendTo('body')[0];
    var url = iframe.src = (window.__karma__ ? "/base/test/" : "./") + "../demo/scroll/index.html";

    iframe.onload = function () {
      var window, document, defer;

      $.Deferred().resolve()
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;

        assert.ok(1, 'page1');
        assert.equal(document.title, 'pjax demo1', "title");
        assert.equal($('#header p:first', document).text(), 'header1', "header");
        assert.equal($('#primary p:first', document).text(), 'primary1', "primary");
        assert.equal($(window).scrollLeft(), 0, "scrollX");
        assert.equal($(window).scrollTop(), 0, "scrollY");

        defer = $.Deferred();
        window.$(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        window.$('#primary a:eq(1)', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        assert.ok(1, 'page2');
        assert.equal(url, window.location.href, "url");
        assert.equal(document.title, 'pjax demo2', "title");
        assert.equal($('#header p:first', document).text(), 'header1', "header");
        assert.equal($('#primary p:first', document).text(), 'primary2', "primary");
        assert.equal($(window).scrollLeft(), 50, "scrollX");
        assert.equal($(window).scrollTop(), 0, "scrollY");
        window.scrollTo($(window).scrollLeft(), 50);

        defer = $.Deferred();
        window.$(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        window.$('#primary a:eq(2)', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        assert.ok(1, 'page3');
        assert.equal(document.title, 'pjax demo3', "title");
        assert.equal($('#header p:first', document).text(), 'header1', "header");
        assert.equal($('#primary p:first', document).text(), 'primary3', "primary");
        assert.equal($(window).scrollLeft(), 50, "scrollX");
        assert.equal($(window).scrollTop(), 50, "scrollY");

        done();
      });
    };
  });
});

suite("Scope1", function () {
  this.timeout(10000);
  test("check", function (done) {
    var iframe = $('<iframe/>', { 'class': "fixture" }).width(1024).height(960).appendTo('body')[0];
    var url = iframe.src = (window.__karma__ ? "/base/test/" : "./") + "../demo/scope/index.html";

    iframe.onload = function () {
      var window, document, defer;

      $.Deferred().resolve()
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;

        assert.ok(1, 'page top');
        assert.equal($('#header p:first', document).text(), 'header top', "header");
        assert.equal($('#primary p:first', document).text(), 'primary top', "primary");

        defer = $.Deferred();
        setTimeout(defer.resolve, 1000);
        window.$(window).one('pjax.load', function () { setTimeout(defer.reject, 0); });
        window.$('#primary a[href$="a.html"]', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        defer = $.Deferred();
        iframe.onload = defer.resolve;
        window.location.href = url;

        return defer;
      })
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;

        assert.ok(1, 'page a');
        assert.equal($('#header p:first', document).text(), 'header a', "header");
        assert.equal($('#primary p:first', document).text(), 'primary a', "primary");

        defer = $.Deferred();
        window.$(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        window.$('#primary a[href$="b.html"]', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        assert.ok(1, 'page b');
        assert.equal($('#header p:first', document).text(), 'header a', "header");
        assert.equal($('#primary p:first', document).text(), 'primary b', "primary");

        defer = $.Deferred();
        setTimeout(defer.resolve, 1000);
        window.$(window).one('pjax.load', function () { setTimeout(defer.reject, 0); });
        window.$('#primary a[href$="/pjax/index.html"]', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        done();
      });
    };
  });
});

suite("Scope2", function () {
  this.timeout(10000);
  test("check", function (done) {
    var iframe = $('<iframe/>', { 'class': "fixture" }).width(1024).height(960).appendTo('body')[0];
    var url = iframe.src = (window.__karma__ ? "/base/test/" : "./") + "../demo/scope/pjax/index.html";

    iframe.onload = function () {
      var window, document, defer;

      $.Deferred().resolve()
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;

        assert.ok(1, 'page pjax');
        assert.equal($('#header p:first', document).text(), 'header pjax', "header");
        assert.equal($('#primary p:first', document).text(), 'primary pjax', "primary");

        defer = $.Deferred();
        window.$(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        window.$('#primary a[href$="/pjax/inherit/index.html"]', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        assert.ok(1, 'page pjax/inherit');
        assert.equal($('#header p:first', document).text(), 'header pjax', "header");
        assert.equal($('#primary p:first', document).text(), 'primary pjax/inherit', "primary");

        defer = $.Deferred();
        setTimeout(defer.resolve, 1000);
        window.$(window).one('pjax.load', function () { setTimeout(defer.reject, 0); });
        window.$('#primary a[href$="/pjax/except/index.html"]', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        defer = $.Deferred();
        iframe.onload = defer.resolve;
        window.location.href = url;

        return defer;
      })
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;

        assert.ok(1, 'page pjax/except');
        assert.equal($('#header p:first', document).text(), 'header pjax/except', "header");
        assert.equal($('#primary p:first', document).text(), 'primary pjax/except', "primary");

        defer = $.Deferred();
        setTimeout(defer.resolve, 1000);
        window.$(window).one('pjax.load', function () { setTimeout(defer.reject, 0); });
        window.$('#primary a[href$="/user/foo/index.html"]', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        done();
      });
    };
  });
});

suite("Scope3", function () {
  this.timeout(10000);
  test("check", function (done) {
    var iframe = $('<iframe/>', { 'class': "fixture" }).width(1024).height(960).appendTo('body')[0];
    var url = iframe.src = (window.__karma__ ? "/base/test/" : "./") + "../demo/scope/user/foo/index.html";

    iframe.onload = function () {
      var window, document, defer;

      $.Deferred().resolve()
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;

        assert.ok(1, 'page user/foo');
        assert.equal($('#header p:first', document).text(), 'header user/foo', "header");
        assert.equal($('#primary p:first', document).text(), 'primary user/foo', "primary");

        defer = $.Deferred();
        window.$(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        window.$('#primary a[href$="/user/bar/index.html"]', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        assert.ok(1, 'page user/bar');
        assert.equal($('#header p:first', document).text(), 'header user/bar', "header");
        assert.equal($('#primary p:first', document).text(), 'primary user/bar', "primary");
        assert.equal($('#footer p:first', document).text(), 'footer user/foo', "header");

        defer = $.Deferred();
        setTimeout(defer.resolve, 1000);
        window.$(window).one('pjax.load', function () { setTimeout(defer.reject, 0); });
        window.$('#primary a[href$="/user/foo/a/index.html"]', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        defer = $.Deferred();
        iframe.onload = defer.resolve;
        window.location.href = url;

        return defer;
      })
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;

        assert.ok(1, 'page user/foo/a');
        assert.equal($('#header p:first', document).text(), 'header user/foo/a', "header");
        assert.equal($('#primary p:first', document).text(), 'primary user/foo/a', "primary");

        defer = $.Deferred();
        setTimeout(defer.resolve, 1000);
        window.$(window).one('pjax.load', function () { setTimeout(defer.reject, 0); });
        window.$('#primary a[href$="/user/bar/a/index.html"]', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        defer = $.Deferred();
        iframe.onload = defer.resolve;
        window.location.href = url;

        return defer;
      })
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;

        assert.ok(1, 'page user/bar/a');
        assert.equal($('#header p:first', document).text(), 'header user/bar/a', "header");
        assert.equal($('#primary p:first', document).text(), 'primary user/bar/a', "primary");

        defer = $.Deferred();
        window.$(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        window.$('#primary a[href$="/user/bar/b/index.html"]', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        assert.ok(1, 'page user/bar/b');
        assert.equal($('#header p:first', document).text(), 'header user/bar/a', "header");
        assert.equal($('#primary p:first', document).text(), 'primary user/bar/b', "primary");

        defer = $.Deferred();
        setTimeout(defer.resolve, 1000);
        window.$(window).one('pjax.load', function () { setTimeout(defer.reject, 0); });
        window.$('#primary a[href$="/user/foo/c/index.html"]', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        defer = $.Deferred();
        iframe.onload = defer.resolve;
        window.location.href = url;

        return defer;
      })
      .pipe(function () {
        done();
      });
    };
  });
});
*/
