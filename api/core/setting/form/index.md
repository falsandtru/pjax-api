---
layout: bootstrap
title: form
type: page
nav: nav
class: style-api style-api-detail
---

# form
ページ遷移にpjaxを使用するフォームを設定します。初期値は`null`です。

送信データにファイルが含まれない場合はjQueryの`.serializeArray()`メソッドにより、含まれる場合は`FormData`オブジェクトによりデータが設定されます。`FormData`オブジェクトを使用できない環境でファイルが含まれている場合は空データが送信されます。

## form: string
jQueryセレクタによりフォームを設定します。

<pre class="sh brush: js;">
$.pjax({
　　form: 'form:not([method])'
});
</pre>
