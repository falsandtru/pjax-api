---
layout: bootstrap
title: scrollLeft
type: page
nav: nav
class: style-api style-api-detail
---

# scrollLeft
ページ遷移後の横方向のスクロール位置を設定します。初期値は`0`です。

## scrollLeft: number
値を直接指定します。

<pre class="sh brush: js;">
$.pjax({
  scrollLeft: 1
});
</pre>

## scrollLeft: function( event, param, origUrl, destUrl )
スクロール位置を変更しません。

<pre class="sh brush: js;">
$.pjax({
  scrollLeft: null
});
</pre>

## scrollLeft: null
スクロール位置を変更しません。

<pre class="sh brush: js;">
$.pjax({
  scrollLeft: null
});
</pre>

## scrollLeft: false
スクロール位置を変更しません。

<pre class="sh brush: js;">
$.pjax({
  scrollLeft: null
});
</pre>
