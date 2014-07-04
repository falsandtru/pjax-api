---
layout: bootstrap
title: pjax
type: page
nav: nav
class: style-api style-api-detail
---

# pjax() <small><span class="label label-info">chainable</span></small>
pjaxを設定します。

pjaxのメソッドを追加したコンテキストを返します。コンテキストがjQueryオブジェクトである場合、jQueryの`end()`メソッドを実行することでpjaxのメソッドを追加する前の状態に戻すことができます。

<a href="demo/falsandtru/" target="_blank" class="btn btn-primary" role="button">demo</a>

## $.pjax( Setting: setting ): this
`document`オブジェクトへのデリゲートによりpjaxを設定します。

<pre class="sh brush: js;">
$.pjax({area: 'body'});
</pre>

## $().pjax( Setting: setting ): this
コンテキストへのデリゲートによりpjaxを設定します。
`link`パラメータと`form`パラメータはコンテキストにより絞り込まれますが、`area`パラメータは絞り込まれません。

<pre class="sh brush: js;">
$('body').pjax({area: 'body'});
</pre>
