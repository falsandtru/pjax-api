
mocha.setup('tdd');
mocha.setup('bdd');
var assert = chai.assert;
//expectの機能を読み込み
var expect = chai.expect;
//shouldの機能を読み込み
chai.Should();

mocha.checkLeaks();
mocha.globals(['jQuery*']);

window.onload = typeof __karma__ === 'undefined' && function() {
  mocha.run();
};

document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/core.js" charset="utf-8"><\/script>');
document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/event.js" charset="utf-8"><\/script>');

document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/fallback.js" charset="utf-8"><\/script>');
document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/area.js" charset="utf-8"><\/script>');
document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/link.js" charset="utf-8"><\/script>');
document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/filter.js" charset="utf-8"><\/script>');
document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/cache.js" charset="utf-8"><\/script>');
document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/rewrite.js" charset="utf-8"><\/script>');
document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/load.js" charset="utf-8"><\/script>');
document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/scope.js" charset="utf-8"><\/script>');
document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/fragment.js" charset="utf-8"><\/script>');

document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/disable.js" charset="utf-8"><\/script>');
document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/enable.js" charset="utf-8"><\/script>');
document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/click.js" charset="utf-8"><\/script>');
document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/getCache.js" charset="utf-8"><\/script>');
document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/setCache.js" charset="utf-8"><\/script>');
document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/removeCache.js" charset="utf-8"><\/script>');
document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + 'unit/clearCache.js" charset="utf-8"><\/script>');
