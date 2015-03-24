---
layout: bootstrap
title: replace
type: page
nav: nav
class: style-api style-api-detail
---

# replace
`replace`パラメータに一致した要素からのページ遷移をURLを追加せず書き換えて行います。初期値は`null`です。

<a href="{{ site.basepath }}demo/replace/" target="_blank" class="btn btn-primary" role="button">demo</a>

## replace: string
jQueryセレクタにより要素絞り込みます。

<pre class="sh brush: js;">
$.pjax({
  replace: '.replace'
});
</pre>

## replace: function()
関数により要素絞り込みます。
