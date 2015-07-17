---
layout: bootstrap
title: click
type: page
nav: nav
class: style-api style-api-detail
---

# click() <small><span class="label label-info">chainable</span></small>
クリックによるpjaxを使用したページ遷移を行います。pjaxを使用できない場合は通常のページ遷移にフォールバックされます。

## click(): this
コンテキストのアンカーリンクを使用します。

<pre class="sh brush: js;">
$('a').pjax().click();
</pre>

## click( Anchor: element/jQuery): this
渡されたアンカーリンクを使用します。

<pre class="sh brush: js;">
$.pjax.click($('a'));
</pre>

## click( Url: string [, Attributes: json ] ): this
渡されたデータを元にアンカーリンクを生成して使用します。第二引数はアンカーリンクの属性となります。

<pre class="sh brush: js;">
$.pjax.click('');
</pre>
