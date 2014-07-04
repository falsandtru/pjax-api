---
layout: bootstrap
title: hashquery
type: page
nav: nav
class: style-api style-api-detail
---

# hashquery
ハッシュごとにページを更新するかを設定します。原則としてハッシュはサーバーに影響を及ぼすべきではないため使用しないべきです。初期値は`false`です。

## hashquery: boolean
有効無効を切り替えます。

<pre class="sh brush: js;">
$.pjax({
  hashquery: true
});
</pre>
