var path = '/' + window.location.pathname.match(/\w.*\//);
$.pjax({
  scope: {
    '/': ['/'],
    '/base/': ['!' + path + 'bar/', 'inherit'],
    '/jquery.pjax.js/': ['!' + path + 'bar/', 'inherit']
  }
});