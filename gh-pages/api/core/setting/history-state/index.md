---
layout: bootstrap
title: historyState
type: page
nav: nav
class: style-api style-api-detail
---

# historyState
ページ遷移時に設定する`window.history.state`の値を設定します。初期値は`null`です。

## historyState: function( event, setting, origLocation, destLocation )
関数の戻り値を値に設定します。

<pre class="sh brush: js;">
$.pjax({
  historyState: function(){return 'pjax';}
});
</pre>

## historyState: any
値を直接指定します。

<pre class="sh brush: js;">
$.pjax({
  historyState: 'pjax'
});
</pre>
