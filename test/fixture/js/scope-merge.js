var path = '/' + window.location.pathname.match(/\w.*\//);
$.pjax({
  scope: {
    '$/': { area: '#primary' },
    'pattern': ['/'],
    '/base/': 'pattern',
    '/jquery.pjax.js/': 'pattern'
  }
});