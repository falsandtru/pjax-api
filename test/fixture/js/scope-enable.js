var path = '/' + window.location.pathname.match(/\w.*\//);
$.pjax({
  scope: {
    '/': [path + 'index.html', path + '2.html']
  }
});