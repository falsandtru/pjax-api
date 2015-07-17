---
layout: bootstrap
title: submit
type: page
nav: nav
class: style-api style-api-detail
---

# submit() <small><span class="label label-info">chainable</span></small>
フォーム送信によるpjaxを使用したページ遷移を行います。pjaxを使用できない場合は通常のページ遷移にフォールバックされます。

## submit(): this
コンテキストのフォームを使用します。

<pre class="sh brush: js;">
$('form').pjax().submit();
</pre>

## submit( Form: element/jQuery ): this
渡されたフォームを使用します。

<pre class="sh brush: js;">
$.pjax.submit($('form'));
</pre>

## submit( Url: string, Attributes: json, Data: json|array ): this
渡されたデータを元に生成したフォームを使用します。第二引数はフォームの属性となります。第三引数は送信するデータセットをJSON、またはフォームの構成要素の仕様を配列で渡します。

### Object

<pre class="sh brush: js;">
$.pjax.submit('', {method: 'POST'}, {name: "data"});
</pre>

### Array

<pre class="sh brush: js;">
$.pjax.submit('', {method: 'POST'}, [{tag: 'input', name: 'name', value: 'data', type: 'text', attrs: null}]);
</pre>
