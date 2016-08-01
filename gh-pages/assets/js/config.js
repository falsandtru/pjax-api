new window['pjax-api'].Pjax({
  areas: [
    '#container',
    'body'
  ]
});
window.addEventListener('pjax:fetch', () => console.time('pjax: fetch -> ready'));
document.addEventListener('pjax:ready', () => console.timeEnd('pjax: fetch -> ready'));
