---
layout: bootstrap
title: state
type: page
nav: nav
class: style-api style-api-detail
---

# state
ページ遷移時に設定する`window.history.state`の値を設定します。初期値は`null`です。

## state: function( event, param, origUrl, destUrl )
関数の戻り値を値に設定します。

<pre class="sh brush: js;">
$.pjax({
  state: function(){return 'pjax';}
});
</pre>

## state: any
値を直接指定します。

<pre class="sh brush: js;">
$.pjax({
  state: 'pjax'
});
</pre>
