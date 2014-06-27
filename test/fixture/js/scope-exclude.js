var path = '/' + window.location.pathname.match(/\w.*\//);
$.pjax({
  scope: {
    '/': ['/', '!' + path + '3.html']
  }
});