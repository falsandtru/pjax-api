var Pjax = require('pjax-api').Pjax;
new Pjax({
  areas: [
    '#header, #primary',
    '#container',
    'body'
  ]
});
