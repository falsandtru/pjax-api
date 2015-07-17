
/^\d\.(?:[6-9]|\d{2,})\./.test(env.jquery) &&
suite("Bind", function () {
  this.timeout(5000);

  test("enable", function (done) {
    var query = '?jquery=' + env.jquery + '&test=bind-enable.js';

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
        assert.equal(document.title, 'pjax demo2', "title");
        assert.equal($('h1').text(), 'page2', "page2");

        defer = self.$.Deferred();
        $(window).one('pjax:load', function () { setTimeout(defer.resolve, 0); });
        $('#primary ul a:eq(2)').each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        assert.equal(document.title, 'pjax demo3', "title");
        assert.equal($('h1').text(), 'page3', "page3");

        defer = self.$.Deferred();
        $(window).one('pjax:load', function () { setTimeout(defer.resolve, 0); });
        $('#primary ul a:eq(1)').each(function () { url = this.href; }).click();

        return defer;
      })
      .pipe(function () {
        assert.equal(document.title, 'pjax demo2', "title");
        assert.equal($('h1').text(), 'page2', "page2");

        done();
      });
    };
  });

});
