
suite("Method - disable", function () {
  this.timeout(5000);

  test("empty", function (done) {
    var query = '?jquery=' + env.jquery + '&test=pjax.js';

    var iframe = $('<iframe/>', { 'class': "fixture" }).width(1024).height(960).appendTo('body')[0];
    var url = iframe.src = (window.__karma__ ? "/base/test/" : "./") + "fixture/index.html" + query;

    iframe.onload = function () {
      var window, document, $, defer;

      self.$.Deferred().resolve()
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;
        $ = window.$;

        assert.ok(1, 'page1');
        assert.equal(document.title, 'pjax demo1', "title");
        assert.equal($('#header p:first').text(), 'header1', "header");
        assert.equal($('#primary p:first').text(), 'primary1', "primary");

        $.pjax.disable();

        defer = self.$.Deferred();
        setTimeout(defer.resolve, 1000);
        window.$(window).one('pjax.load', function () { setTimeout(defer.reject, 0); });
        $.pjax.click($('#primary ul a:eq(1)').each(function () { url = this.href; })[0].href);

        return defer;
      })
      .pipe(function () {
        done();
      });
    };
  });

});
