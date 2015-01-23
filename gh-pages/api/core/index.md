---
layout: bootstrap
title: Core
type: page
nav: nav
class: style-api style-api-list
---

# Core

## [pjax()]({{ site.basepath }}api/core/pjax/) <small><span class="label label-info">chainable</span></small>
pjaxを設定します。

### [area:]({{ site.basepath }}api/core/setting/area/)
更新範囲を設定します。

### [link:]({{ site.basepath }}api/core/setting/link/)
ページ遷移にpjaxを使用するアンカーリンクを設定します。

### [filter:]({{ site.basepath }}api/core/setting/filter/)
`link`パラメータに一致したアンカーリンクを絞り込みます。

### [form:]({{ site.basepath }}api/core/setting/form/)
ページ遷移にpjaxを使用するフォームを設定します。

### [scope:]({{ site.basepath }}api/core/setting/scope/)
ページ遷移にpjaxを使用するURLを設定します。

### [rewrite:]({{ site.basepath }}api/core/setting/rewrite/)
ページ遷移に使用するHTMLDocumentをあらかじめ書き換えます。

### [state:]({{ site.basepath }}api/core/setting/state/)
ページ遷移時に設定する`window.history.state`の値を設定します。

### [scrollTop:]({{ site.basepath }}api/core/setting/scroll-top/)
ページ遷移後の縦方向のスクロール位置を設定します。

### [scrollLeft:]({{ site.basepath }}api/core/setting/scroll-left/)
ページ遷移後の横方向のスクロール位置を設定

### [ajax:]({{ site.basepath }}api/core/setting/ajax/)
内部処理で使用される`$.ajax`のパラメータを設定します。

### [contentType:]({{ site.basepath }}api/core/setting/content-type/)
遷移先として読み込むデータで許容するコンテントタイプを設定します。

### [load:]({{ site.basepath }}api/core/setting/load/)
遷移先のCSSやJavaScriptなどの読み込みを設定します。

### [cache:]({{ site.basepath }}api/core/setting/cache/)
キャッシュの使用を設定します。

### [balance:]({{ site.basepath }}api/core/setting/balance/)
ロードバランスを設定します。

### [redirect:]({{ site.basepath }}api/core/setting/redirect/)
リダイレクト先への再移動にpjaxを使用するかを設定します。

### [wait:]({{ site.basepath }}api/core/setting/wait/) <small><span class="label label-primary">jQuery1.6+</span></small>
ページ遷移の最低待ち時間を設定します。

### [fallback:]({{ site.basepath }}api/core/setting/fallback/)
エラー処理を設定します。

### [reset:]({{ site.basepath }}api/core/setting/reset/)
メモリリーク対策としてJavaScriptの実行状態をリセットする条件を設定します。

### [fix:]({{ site.basepath }}api/core/setting/fix/)
pjaxの諸問題の修正を設定します。

### [database:]({{ site.basepath }}api/core/setting/database/)
IndexedDBの使用を設定します。

### [server:]({{ site.basepath }}api/core/setting/server/)
サーバーへのリクエストを設定します。

### [overlay:]({{ site.basepath }}api/core/setting/overlay/) <small><span class="label label-warning">IE10+</span></small>
ハッシュリンクにコンテンツのポップアップ表示機能を追加します。

### [data:]({{ site.basepath }}api/core/setting/data/)
任意のデータを設定します。

### [callback:]({{ site.basepath }}api/callback/)
コールバックを設定します。

### [callbacks:]({{ site.basepath }}api/callback/)
詳細なコールバックを設定します。
