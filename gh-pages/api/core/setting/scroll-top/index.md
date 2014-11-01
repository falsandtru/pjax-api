---
layout: bootstrap
title: scrollTop
type: page
nav: nav
class: style-api style-api-detail
---

# scrollTop
ページ遷移後の縦方向のスクロール位置を設定します。初期値は`0`です。

## scrollTop: number
値を直接指定します。

<pre class="sh brush: js;">
$.pjax({
  scrollTop: 1
});
</pre>

## scrollTop: function( event, setting, origLocation, destLocation )
スクロール位置を関数の戻り値で設定します。

<pre class="sh brush: js;">
$.pjax({
  scrollTop: function(){return 1;}
});
</pre>

## scrollTop: null
スクロール位置を変更しません。

<pre class="sh brush: js;">
$.pjax({
  scrollTop: null
});
</pre>

## scrollTop: false
スクロール位置を変更しません。

<pre class="sh brush: js;">
$.pjax({
  scrollTop: false
});
</pre>
