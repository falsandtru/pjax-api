
suite("Method - setCache", function () {
  this.timeout(5000);

  test("empty", function (done) {
    var query = '?jquery=' + env.jquery + '&test=cache-enable.js';

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

        $.pjax.setCache();

        assert.equal(!!$.pjax.getCache(), true, "$.pjax.setCache()");

        done();
      });
    };
  });

  test("url", function (done) {
    var query = '?jquery=' + env.jquery + '&test=cache-enable.js';

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

        $.pjax.setCache(window.location.href);

        assert.equal($.pjax.getCache(window.location.href), $.pjax.getCache(), "$.pjax.setCache(url)");

        done();
      });
    };
  });

  test("data", function (done) {
    var query = '?jquery=' + env.jquery + '&test=cache-enable.js';

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

        $.pjax.setCache(window.location.href, document.body.outerHTML);

        assert.equal($.pjax.getCache().data, document.body.outerHTML, "$.pjax.setCache(url, body)");

        done();
      });
    };
  });

  test("XMLHttpRequest", function (done) {
    var query = '?jquery=' + env.jquery + '&test=cache-enable.js';

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

        defer = self.$.Deferred();

        return self.$.ajax({ url: window.location.href });
      })
      .pipe(function (data, testStatus, XMLHttpRequest) {

        $.pjax.setCache(window.location.href, null, testStatus, XMLHttpRequest);

        assert.equal($.pjax.getCache().XMLHttpRequest.responseText, XMLHttpRequest.responseText, "$.pjax.setCache(url, body, null, testStatus, XMLHttpRequest)");

        done();
      });
    };
  });

});
