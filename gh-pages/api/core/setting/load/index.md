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

JavaScriptを実行順序を維持して読み込みます。同一の外部参照JavaScriptは1回だけ読み込まれます。インラインJavaScriptは繰り返し実行されます。jQueryの仕様により、JavaScriptは読み込まれていてもDOMに追加されません。

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
繰り返し読み込むJavaScriptをjQueryセレクタで設定します。初期値は`''`です。

## load.ignore: string
同期、読み込みの対象としない要素をjQueryセレクタで設定します。初期値は`'[src*="jquery.js"], [src*="jquery.min.js"], [href^="chrome-extension://"]'`です。

## load.sync: boolean
`defer`属性を持つJavaScriptの読み込みを、更新されたコンテンツが描画されるまで待ちます。ただし、描画の確認回数が100回を超えた場合はその時点で読み込みます。初期値は`true`です。

## load.ajax: object
外部参照JavaScriptを読み込む際に`ajax`パラメータにマージして使用する`$.ajax`のパラメータを設定します。初期値は`'{dataType: 'script', cache: true}'`です。非同期設定は要素の`async`属性により設定されます。

## load.rewrite: function( element )
JavaScriptまたはCSSとして読み込まれる要素を戻り値の要素で置換します。初期値は`null`です。

CloudFlareのRocketLoaderを使用するなどして要素が書き換えられている場合に有用です。
