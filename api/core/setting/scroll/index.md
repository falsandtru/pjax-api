---
layout: bootstrap
title: scroll
type: page
nav: nav
class: style-api style-api-detail
---

# scroll
スクロール位置復元用の設定項目を持ちます。

## scroll.delay: number
スクロール位置の記録処理がスクロールイベント発生後実行されるまでの待機時間をミリ秒で設定します。待機時間が経過する前に新たなスクロールが行われた場合は前回までのスクロールによる待機中の処理の実行はキャンセルされます。初期値は`300`です。パラメータの詳細な仕様は<a href="https://github.com/falsandtru/jquery.visibilitytrigger.js" target="_blank">visibilitytrigger</a>の同名のパラメータを参照してください。

<pre class="sh brush: js;">
$.pjax({
  scroll: {
    delay: 100
  }
});
</pre>
