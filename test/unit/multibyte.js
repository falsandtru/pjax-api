
suite("Multibyte", function () {
  this.timeout(5000);

  test("directory", function (done) {
    var query = '?jquery=' + env.jquery + '&test=area-string.js';

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
        assert.equal($('#header p:first').text(), 'header1', "header");
        assert.equal($('#primary p:first').text(), 'primary1', "primary");
        assert.equal($('#secondary p:first').text(), 'secondary1', "secondary");
        assert.equal($('#tertiary p:first').text(), 'tertiary1', "tertiary");

        defer = self.$.Deferred();
        $(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        $.pjax.click(url = 'あアｱ亜/2.html');

        return defer;
      })
      .pipe(function () {
        assert.equal(document.title, 'pjax demo2', "title");
        assert.equal($('#header p:first').text(), 'header1', "header");
        assert.equal($('#primary p:first').text(), 'primary2', "primary");

        defer = self.$.Deferred();
        $(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });
        window.history.back();

        return defer;
      })
      .pipe(function () {
        done();
      });
    };
  });

});
