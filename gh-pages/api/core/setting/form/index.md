---
layout: bootstrap
title: form
type: page
nav: nav
class: style-api style-api-detail
---

# form
ページ遷移にpjaxを使用するフォームを設定します。初期値は`null`です。

## form: string
jQueryセレクタによりフォームを設定します。

<pre class="sh brush: js;">
$.pjax({
　　form: 'form:not([method])'
});
</pre>
