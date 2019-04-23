var Pjax = require('pjax-api').Pjax;
new Pjax({
  areas: [
    '#container',
    'body'
  ]
});
window.addEventListener('pjax:fetch', function () { console.time('pjax: fetch -> ready'); });
document.addEventListener('pjax:ready', function () { console.timeEnd('pjax: fetch -> ready'); });
