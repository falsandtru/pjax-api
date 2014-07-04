var path = '/' + window.location.pathname.match(/\w.*\//);
$.pjax({
  scope: {
    '/': ['*' + path + '(index|2)\.html']
  }
});