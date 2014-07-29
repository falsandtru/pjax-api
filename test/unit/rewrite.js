
suite("Rewrite", function () {
  this.timeout(5000);

  test("enable", function (done) {
    var query = '?jquery=' + env.jquery + '&test=rewrite-enable.js';

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
        $(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        $('#primary ul a:eq(1)').each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        assert.equal(document.title, 'pjax demo2', "title");
        assert.equal($('.rewrite').text(), 'rewrite', "rewrite");

        defer = self.$.Deferred();
        $(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        window.history.back();

        done();
      });
    };
  });

});
