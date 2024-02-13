import { isTransitable } from '../../../data/store/state';
import { bind } from 'typed-dom/listener';

// popstateイベントは事前に検知できないため事前設定
if (isTransitable(window.history.state)) {
  window.history.scrollRestoration = 'manual';
}
// 遷移前ページの設定
bind(window, 'pjax:fetch', () =>
  window.history.scrollRestoration = 'manual', true);
// 遷移後ページの設定
bind(document, 'pjax:ready', () =>
  window.history.scrollRestoration = 'manual', true);
// リロード後のスクロール位置復元に必要
bind(window, 'unload', () =>
  window.history.scrollRestoration = 'auto', true);
