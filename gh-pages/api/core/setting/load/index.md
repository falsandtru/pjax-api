---
layout: bootstrap
title: load
type: page
nav: nav
class: style-api style-api-detail
---

# load
遷移先のCSSやJavaScriptなどの読み込みを設定します。

## load.head: string
HEAD要素内で同期させる要素をjQueryセレクタで設定します。対応している要素は`base`、`meta`、`link`要素のみです。CSSは除外されます。初期値は`''`です。

<pre class="sh brush: js;">
$.pjax({
  load: {
    head: 'base, meta, link'
  }
});
</pre>

## load.css: boolean
CSSを同期するかを設定します。初期値は`false`です。

<pre class="sh brush: js;">
$.pjax({
  load: {
    css: true
  }
});
</pre>

## load.script: boolean
JavaScriptを読み込むかを設定します。初期値は`false`です。

JavaScriptを実行順序を維持して読み込みます。同一の外部参照JavaScriptは1回だけ読み込まれます。インラインJavaScriptは繰り返し実行されます。SCRIPT要素はDOMに追加されないため、実行状態の確認は`rewrite`パラメータによる要素の存在確認またはグローバル変数の参照などによる必要があります。

<pre class="sh brush: js;">
$.pjax({
  load: {
    script: true
  }
});
</pre>

## load.execute: boolean
インラインJavaScriptを実行するかを設定します。初期値は`true`です。

## load.reload: string
繰り返し読み込む外部参照JavaScriptをjQueryセレクタで設定します。初期値は`''`です。

## load.ignore: string
同期、読み込みの対象としない要素をjQueryセレクタで設定します。初期値は`'[src*="jquery.js"], [src*="jquery.min.js"], [href^="chrome-extension://"]'`です。

## load.sync: boolean
`defer`属性を持つJavaScriptの読み込みを更新されたコンテンツが描画されるまで待ちます。ただし、描画の確認回数が100回を超えた場合はその時点で読み込みます。初期値は`true`です。

## load.ajax: object
外部参照JavaScriptを読み込む際に`ajax`パラメータへマージして使用する`$.ajax`のパラメータを設定します。設定値は初期値にマージされます。初期値は`'{dataType: 'script', cache: true}'`です。非同期設定は要素の`async`属性により設定されます。
