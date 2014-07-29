---
layout: bootstrap
title: ajax
type: page
nav: nav
class: style-api style-api-detail
---

# ajax
内部処理で使用される`$.ajax`のパラメータを設定します。設定値は初期値にマージされます。初期値は`{ dataType: 'text' }`です。

<pre class="sh brush: js;">
$.pjax({
  ajax: {
    timeout: 2000
  }
});
</pre>
