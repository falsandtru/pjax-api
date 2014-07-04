---
layout: bootstrap
title: contentType
type: page
nav: nav
class: style-api style-api-detail
---

# contentType
遷移先として読み込むデータで許容するコンテントタイプを設定します。初期値は`'text/html'`です。

## contentType: string
文字列でコンテントタイプを設定します。カンマまたはセミコロン区切りで列挙できます。

<pre class="sh brush: js;">
$.pjax({
  contentType: 'text/html; text/plain'
});
</pre>
