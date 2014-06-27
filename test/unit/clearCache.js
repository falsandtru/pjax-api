
suite("Method - clearCache", function () {
  this.timeout(5000);

  test("empty", function (done) {
    var query = '?jquery=' + env.jquery + '&test=cache-enable.js';

    var iframe = $('<iframe/>', { 'class': "fixture" }).width(1024).height(960).appendTo('body')[0];
    var url = iframe.src = (window.__karma__ ? "/base/test/" : "./") + "fixture/index.html" + query;

    iframe.onload = function () {
      var window, document, $, defer;

      self.$.Deferred().resolve()
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;
        $ = window.$;

        $.pjax.setCache();
        $.pjax.clearCache();

        assert.equal(!!$.pjax.getCache(), false, "$.pjax.removeCache()");

        done();
      });
    };
  });

});
