---
layout: bootstrap
title: link
type: page
nav: nav
class: style-api style-api-detail
---

# link
ページ遷移にpjaxを使用するアンカーリンクを設定します。初期値は`'a:not([target])'`です。

<a href="demo/link/" target="_blank" class="btn btn-primary" role="button">demo</a>

## link: string
文字列によりアンカーリンクを設定します。

<pre class="sh brush: js;">
$.pjax({
　　link: '.pjax a:not([target])'
});
</pre>
