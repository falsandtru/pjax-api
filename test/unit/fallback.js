
suite("Fallback", function () {
  this.timeout(5000);

  test("enable", function (done) {
    var query = '?jquery=' + env.jquery + '&test=fallback-enable.js';

    var iframe = $('<iframe/>', { 'class': "fixture" }).width(1024).height(960).appendTo('body')[0];
    var url = iframe.src = (window.__karma__ ? "/base/test/" : "./") + "fixture/index.html" + query;

    iframe.onload = function () {
      var window, document, $, defer;

      self.$.Deferred().resolve()
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;
        $ = window.$;

        defer = self.$.Deferred();
        setTimeout(defer.resolve, 1000);
        window.$(window).one('pjax.load', function () { setTimeout(defer.reject, 0); });
        window.$('#secondary a:eq(1)', document).each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        done();
      });
    };
  });

});
