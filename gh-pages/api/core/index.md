---
layout: bootstrap
title: Core
type: page
nav: nav
class: style-api style-api-list
---

# Core

## [pjax()](api/core/pjax/) <small><span class="label label-info">chainable</span></small>
pjaxを設定します。

### [area:](api/core/setting/area/)
更新範囲を設定します。

### [link:](api/core/setting/link/)
ページ遷移にpjaxを使用するアンカーリンクを設定します。

### [filter:](api/core/setting/filter/)
`link`パラメータに一致したアンカーリンクを絞り込みます。

### [form:](api/core/setting/form/)
ページ遷移にpjaxを使用するフォームを設定します。

### [scope:](api/core/setting/scope/)
ページ遷移にpjaxを使用するURLを設定します。

### [state:](api/core/setting/state/)
ページ遷移時に設定する`window.history.state`の値を設定します。

### [scrollTop:](api/core/setting/scroll-top/)
ページ遷移後の縦方向のスクロール位置を設定します。

### [scrollLeft:](api/core/setting/scroll-left/)
ページ遷移後の横方向のスクロール位置を設定

### [scroll:](api/core/setting/scroll/)
スクロール位置復元用の設定項目を持ちます。

### [ajax:](api/core/setting/ajax/)
内部処理で使用される`$.ajax`のパラメータを設定します。

### [contentType:](api/core/setting/content-type/)
遷移先として読み込むデータで許容するコンテントタイプを設定します。

### [load:](api/core/setting/load/)
遷移先のCSSやJavaScriptなどの読み込みを設定します。

### [cache:](api/core/setting/cache/)
キャッシュの使用を設定します。

### [redirect:](api/core/setting/redirect/)
リダイレクト先への再移動にpjaxを使用するかを設定します。

### [interval:](api/core/setting/interval/)
更新されたコンテンツの描画を確認する間隔を設定します。

### [wait:](api/core/setting/wait/) <small><span class="label label-primary">jQuery1.6+</span></small>
ページ遷移の最低待ち時間を設定します。

### [fallback:](api/core/setting/fallback/)
エラー処理を設定します。

### [fix:](api/core/setting/fix/)
pjaxの諸問題の修正を設定します。

### [database:](api/core/setting/database/)
IndexedDBの使用を設定します。

### [server:](api/core/setting/server/)
サーバーへのリクエストを設定します。

### [callback:](api/callback/)
コールバックを設定します。

### [callbacks:](api/callback/)
詳細なコールバックを設定します。

### [param:](api/callback/)
コールバックに渡すパラメータを設定します。
