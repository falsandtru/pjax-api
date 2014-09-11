
suite("Scope", function () {
  this.timeout(5000);

  test("enable", function (done) {
    var query = '?jquery=' + env.jquery + '&test=scope-enable.js';

    var iframe = $('<iframe/>', { 'class': "fixture" }).width(1024).height(960).appendTo('body')[0];
    var url = iframe.src = (window.__karma__ ? "/base/test/" : "./") + "fixture/index.html" + query;

    iframe.onload = function () {
      iframe.onload = null;
      var window, document, $, defer;

      self.$.Deferred().resolve()
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;
        $ = window.$;

        assert.equal(document.title, 'pjax demo1', "title");

        defer = self.$.Deferred();
        $(window).one('pjax:load', function () { setTimeout(defer.resolve, 0); });
        $('#primary ul a:eq(1)').each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        assert.equal(url, window.location.href, "url");
        assert.equal(document.title, 'pjax demo2', "title");
        
        defer = self.$.Deferred();
        setTimeout(defer.resolve, 1000);
        window.$(window).one('pjax:load', function () { setTimeout(defer.reject, 0); });
        window.$('#secondary a:eq(2)', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        done();
      });
    };
  });

  test("subdir", function (done) {
    var query = '?jquery=' + env.jquery + '&test=scope-subdir.js';

    var iframe = $('<iframe/>', { 'class': "fixture" }).width(1024).height(960).appendTo('body')[0];
    var url = iframe.src = (window.__karma__ ? "/base/test/" : "./") + "fixture/index.html" + query;

    iframe.onload = function () {
      iframe.onload = null;
      var window, document, $, defer;

      self.$.Deferred().resolve()
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;
        $ = window.$;

        assert.equal(document.title, 'pjax demo1', "title");

        defer = self.$.Deferred();
        $(window).one('pjax:load', function () { setTimeout(defer.resolve, 0); });
        $.pjax.click('foo/index.html');

        return defer;
      })
      .pipe(function () {
        assert.equal(document.title, 'pjax demo1', "title");

        defer = self.$.Deferred();
        setTimeout(defer.resolve, 1000);
        window.$(window).one('pjax:load', function () { setTimeout(defer.reject, 0); });
        $.pjax.click('../bar/index.html');

        return defer;
      })
      .pipe(function () {
        done();
      });
    };
  });

  test("regexp", function (done) {
    var query = '?jquery=' + env.jquery + '&test=scope-regexp.js';

    var iframe = $('<iframe/>', { 'class': "fixture" }).width(1024).height(960).appendTo('body')[0];
    var url = iframe.src = (window.__karma__ ? "/base/test/" : "./") + "fixture/index.html" + query;

    iframe.onload = function () {
      iframe.onload = null;
      var window, document, $, defer;

      self.$.Deferred().resolve()
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;
        $ = window.$;

        assert.equal(document.title, 'pjax demo1', "title");

        defer = self.$.Deferred();
        $(window).one('pjax:load', function () { setTimeout(defer.resolve, 0); });
        $('#primary ul a:eq(1)').each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        assert.equal(url, window.location.href, "url");
        assert.equal(document.title, 'pjax demo2', "title");

        defer = self.$.Deferred();
        setTimeout(defer.resolve, 1000);
        window.$(window).one('pjax:load', function () { setTimeout(defer.reject, 0); });
        window.$('#secondary a:eq(2)', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        done();
      });
    };
  });

  test("exclude", function (done) {
    var query = '?jquery=' + env.jquery + '&test=scope-exclude.js';

    var iframe = $('<iframe/>', { 'class': "fixture" }).width(1024).height(960).appendTo('body')[0];
    var url = iframe.src = (window.__karma__ ? "/base/test/" : "./") + "fixture/index.html" + query;

    iframe.onload = function () {
      iframe.onload = null;
      var window, document, $, defer;

      self.$.Deferred().resolve()
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;
        $ = window.$;

        assert.equal(document.title, 'pjax demo1', "title");

        defer = self.$.Deferred();
        $(window).one('pjax:load', function () { setTimeout(defer.resolve, 0); });
        $('#primary ul a:eq(1)').each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        assert.equal(url, window.location.href, "url");
        assert.equal(document.title, 'pjax demo2', "title");

        defer = self.$.Deferred();
        setTimeout(defer.resolve, 1000);
        window.$(window).one('pjax:load', function () { setTimeout(defer.reject, 0); });
        window.$('#secondary a:eq(2)', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        done();
      });
    };
  });

  test("inherit", function (done) {
    var query = '?jquery=' + env.jquery + '&test=scope-inherit.js';

    var iframe = $('<iframe/>', { 'class': "fixture" }).width(1024).height(960).appendTo('body')[0];
    var url = iframe.src = (window.__karma__ ? "/base/test/" : "./") + "fixture/index.html" + query;

    iframe.onload = function () {
      iframe.onload = null;
      var window, document, $, defer;

      self.$.Deferred().resolve()
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;
        $ = window.$;

        assert.equal(document.title, 'pjax demo1', "title");

        defer = self.$.Deferred();
        $(window).one('pjax:load', function () { setTimeout(defer.resolve, 0); });
        $.pjax.click('foo/index.html');

        return defer;
      })
      .pipe(function () {
        assert.equal(document.title, 'pjax demo1', "title");

        defer = self.$.Deferred();
        setTimeout(defer.resolve, 1000);
        window.$(window).one('pjax:load', function () { setTimeout(defer.reject, 0); });
        $.pjax.click('../bar/index.html');

        return defer;
      })
      .pipe(function () {
        done();
      });
    };
  });

  test("rewrite", function (done) {
    var query = '?jquery=' + env.jquery + '&test=scope-rewrite.js';

    var iframe = $('<iframe/>', { 'class': "fixture" }).width(1024).height(960).appendTo('body')[0];
    var url = iframe.src = (window.__karma__ ? "/base/test/" : "./") + "fixture/index.html" + query;

    iframe.onload = function () {
      iframe.onload = null;
      var window, document, $, defer;

      self.$.Deferred().resolve()
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;
        $ = window.$;

        assert.equal(document.title, 'pjax demo1', "title");

        defer = self.$.Deferred();
        $(window).one('pjax:load', function () { setTimeout(defer.resolve, 0); });
        $.pjax.click('foo/index.html');

        return defer;
      })
      .pipe(function () {
        assert.equal(document.title, 'pjax demo1', "title");

        defer = self.$.Deferred();
        $(window).one('pjax:load', function () { setTimeout(defer.resolve, 0); });
        $.pjax.click('../foo/2.html');

        return defer;
      })
      .pipe(function () {
        assert.equal(document.title, 'pjax demo2', "title");

        defer = self.$.Deferred();
        setTimeout(defer.resolve, 1000);
        window.$(window).one('pjax:load', function () { setTimeout(defer.reject, 0); });
        $.pjax.click('../bar/index.html');

        return defer;
      })
      .pipe(function () {
        done();
      });
    };
  });

  test("override outer", function (done) {
    var query = '?jquery=' + env.jquery + '&test=scope-override-outer.js';

    var iframe = $('<iframe/>', { 'class': "fixture" }).width(1024).height(960).appendTo('body')[0];
    var url = iframe.src = (window.__karma__ ? "/base/test/" : "./") + "fixture/index.html" + query;

    iframe.onload = function () {
      iframe.onload = null;
      var window, document, $, defer;

      self.$.Deferred().resolve()
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;
        $ = window.$;

        assert.equal($('#header p:first').text(), 'header1', "header");
        assert.equal($('#primary p:first').text(), 'primary1', "primary");

        defer = self.$.Deferred();
        $(window).one('pjax:load', function () { setTimeout(defer.resolve, 0); });
        $('#primary ul a:eq(1)').each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        assert.equal($('#header p:first').text(), 'header1', "header");
        assert.equal($('#primary p:first').text(), 'primary2', "primary");

        done();
      });
    };
  });

  test("override inner", function (done) {
    var query = '?jquery=' + env.jquery + '&test=scope-override-inner.js';

    var iframe = $('<iframe/>', { 'class': "fixture" }).width(1024).height(960).appendTo('body')[0];
    var url = iframe.src = (window.__karma__ ? "/base/test/" : "./") + "fixture/index.html" + query;

    iframe.onload = function () {
      iframe.onload = null;
      var window, document, $, defer;

      self.$.Deferred().resolve()
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;
        $ = window.$;

        assert.equal($('#header p:first').text(), 'header1', "header");
        assert.equal($('#primary p:first').text(), 'primary1', "primary");

        defer = self.$.Deferred();
        $(window).one('pjax:load', function () { setTimeout(defer.resolve, 0); });
        $('#primary ul a:eq(1)').each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        assert.equal($('#header p:first').text(), 'header1', "header");
        assert.equal($('#primary p:first').text(), 'primary2', "primary");

        done();
      });
    };
  });

});
