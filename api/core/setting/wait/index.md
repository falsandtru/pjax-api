---
layout: bootstrap
title: wait
type: page
nav: nav
class: style-api style-api-detail
---

# wait <small><span class="label label-primary">jQuery1.6+</span></small>
`$.ajax`実行からコンテンツの更新までの最低待ち時間を設定します。初期値は`0`です。

## wait: number
待ち時間をミリ秒で設定します。

<pre class="sh brush: js;">
$.pjax({
  wait: 100
});
</pre>

## wait: function( event, param, origUrl, destUrl )
待ち時間を関数の戻り値で設定します。

<pre class="sh brush: js;">
$.pjax({
  wait: 100
});
</pre>
