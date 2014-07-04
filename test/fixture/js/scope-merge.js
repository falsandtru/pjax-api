var path = '/' + window.location.pathname.match(/\w.*\//);
$.pjax({
  scope: {
    '/base/': ['/', {area: '#primary'}],
    '/jquery.pjax.js/': ['/', { area: '#primary' }]
  }
});