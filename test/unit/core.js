
suite("Core", function () {
  this.timeout(5000);

  test("pjax", function (done) {
    var query = '?jquery=' + env.jquery + '&test=pjax.js';

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

        assert.equal($.pjax()[0], document, "context");

        done();
      });
    };
  });

  test("fn.pjax", function (done) {
    var query = '?jquery=' + env.jquery + '&test=fn.pjax.js';

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

        assert.equal($(document).pjax()[0], document, "context");

        done();
      });
    };
  });

  test("revert", function (done) {
    var query = '?jquery=' + env.jquery + '&test=fn.pjax.js';

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

        assert.equal($().pjax().end().click, $().click, "revert");

        done();
      });
    };
  });

  test("method", function (done) {
    var query = '?jquery=' + env.jquery + '&test=fn.pjax.js';

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

        assert.equal($().pjax().enable, $.pjax.enable, "enable");
        assert.equal($().pjax().disable, $.pjax.disable, "disable");
        assert.equal($().pjax().click, $.pjax.click, "click");
        assert.equal($().pjax().submit, $.pjax.submit, "submit");
        assert.equal($().pjax().follow, $.pjax.follow, "follow");
        assert.equal($().pjax().setCache, $.pjax.setCache, "setCache");
        assert.equal($().pjax().getCache, $.pjax.getCache, "getCache");
        assert.equal($().pjax().removeCache, $.pjax.removeCache, "removeCache");
        assert.equal($().pjax().clearCache, $.pjax.clearCache, "clearCache");

        done();
      });
    };
  });

});
