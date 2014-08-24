
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

        var defer = self.$.Deferred();
        var count = 0;
        window.console.notice = function (text) {
          switch (text) {
            case 'area':
              count++;
              1 !== count && setTimeout(done = defer.reject, 0);
              break;
            case 'inline':
              count++;
              2 !== count && setTimeout(done = defer.reject, 0);
              break;
            case 'external':
              count++;
              3 !== count && setTimeout(done = defer.reject, 0);
              3 === count && setTimeout(defer.resolve, 0);
              break;
            default:
              setTimeout(done = defer.reject, 0);
          }
        };
        $('#primary a:eq(1)', document).pjax().click();

        return defer;
      })
      .pipe(function () {
        window.console.notice = new Function();

        assert.equal(document.title, 'pjax demo2', "title");
        assert.equal($('head>script[src$="test.js"]').length, 1, "external");
        assert.equal($('#primary>script:contains("console.notice")').length, 1, "area");
        assert.equal($('body>script:contains("console.notice")').length, 1, "inline");

        var defer = self.$.Deferred();
        $(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        $('#primary a:eq(2)', document).pjax().click();

        return defer;
      })
      .pipe(function () {
        assert.equal(document.title, 'pjax demo3', "title");
        assert.equal($('head>script[src$="test.js"]').length, 1, "external");
        assert.equal($('#primary>script:contains("console.notice")').length, 1, "area");
        assert.equal($('body>script:contains("console.notice")').length, 2, "inline");

        done();
      });
    };
  });

});
