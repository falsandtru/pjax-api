
suite("Load", function () {
  this.timeout(5000);

  test("css", function (done) {
    var query = '?jquery=' + env.jquery + '&test=load-css.js';

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
        assert.equal($('#header', document).css('background-color').toLowerCase(), 'rgb(238, 238, 0)', "css");

        defer = self.$.Deferred();
        $(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        $('#primary a:eq(1)', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        assert.equal(document.title, 'pjax demo2', "title");
        assert.equal($('#header', document).css('background-color').toLowerCase(), 'rgb(238, 0, 0)', "css");

        defer = self.$.Deferred();
        $(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        $('#primary a:eq(2)', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        assert.equal(document.title, 'pjax demo3', "title");
        assert.equal($('#header', document).css('background-color').toLowerCase(), 'rgb(0, 238, 238)', "css");

        done();
      });
    };
  });

  test("script", function (done) {
    var query = '?jquery=' + env.jquery + '&test=load-script.js';

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
        window.console.notice = function (text) {
          window.console.notice = 'external' === text && function (text) {
            window.console.notice = 'area' === text && function (text) {
              'inline' === text && $(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
            };
          };
        };
        $('#primary a:eq(1)', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        assert.equal(document.title, 'pjax demo2', "title");
        assert.equal($('head>script[src*="test"]').length, 1, "external");
        assert.equal($('#primary>script:contains("console.notice")').length, 1, "inline");
        assert.equal($('body>script:contains("console.notice")').length, 1, "inline");

        defer = self.$.Deferred();
        $(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        $('#primary a:eq(2)', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        assert.equal(document.title, 'pjax demo3', "title");
        assert.equal($('head>script[src*="test"]').length, 1, "external");
        assert.equal($('#primary>script:contains("console.notice")').length, 1, "inline");
        assert.equal($('body>script:contains("console.notice")').length, 2, "inline");

        done();
      });
    };
  });

});
