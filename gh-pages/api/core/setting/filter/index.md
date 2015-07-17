---
layout: bootstrap
title: filter
type: page
nav: nav
class: style-api style-api-detail
---

# filter
`link`パラメータに一致したアンカーリンクを絞り込みます。初期値は以下のとおりです。

<pre class="sh brush: js;">
function () {
  var dest = document.createElement('a');
  dest.href = typeof this.href === 'string' ? this.href : this.href.baseVal;
  return /^https?:/.test(dest.href)
      && /\/[^.]*$|\.(html?|php)$/.test(dest.pathname.replace(/^\/?/, '/'));
}
</pre>

## filter: string
jQueryセレクタによりアンカーリンクを絞り込みます。

<pre class="sh brush: js;">
$.pjax({
  filter: '*'
});
</pre>

## filter: function()
関数によりアンカーリンクを絞り込みます。

<pre class="sh brush: js;">
$.pjax({
  filter: function () { return true; }
});
</pre>
