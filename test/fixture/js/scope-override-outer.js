var path = '/' + window.location.pathname.match(/\w.*\//);
$.pjax({
  scope: {
    pattern: ['/'],
    $pattern: { area: '#primary' },
    '/base/': 'pattern',
    '/jquery.pjax.js/': 'pattern'
  }
});