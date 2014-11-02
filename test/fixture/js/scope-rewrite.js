var path = '/' + window.location.pathname.match(/\w.*\//);
$.pjax({
  scope: {
    '/': ['*' + path + '[^/]+'],
    '/base/test/fixture/': ['rewrite', 'inherit'],
    '/base/test/fixture/*/': ['!' + path + 'bar/'],
    '/jquery-pjax/test/fixture/': ['rewrite', 'inherit'],
    '/jquery-pjax/test/fixture/*/': ['!' + path + 'bar/'],
    rewrite: function (key) { return key.replace(/(\/fixture\/)\w+/, '$1*'); }
  }
});