---
layout: bootstrap
title: submit
type: page
nav: nav
class: style-api style-api-detail
---

# submit() <small><span class="label label-info">chainable</span></small>
フォーム送信によるpjaxを使用したページ遷移を行います。pjaxを使用できない場合は通常のページ遷移にフォールバックされます。

## submit( Form: jQuery ): this
渡されたフォームを使用します。

## submit( Form: element ): this
渡されたフォームを使用します。

## submit( Url: string, Attribute: object, Data: object ): this
渡されたデータを元に生成したフォームを使用します。第二引数のプロパティがフォームの属性となります。第三引数のプロパティが送信データの名前と値の組になります。送信データはすべてTEXTAREA要素を使用して設定されます。

## submit( Url: string, Attribute: object, Data: array ): this
渡されたデータを元に生成したフォームを使用します。第二引数のプロパティがフォームの属性となります。第三引数はフォームの構成要素の仕様をJSONまたは配列で渡します。

### JSON
`$.pjax.submit('/', {method: 'POST'}, {"name": "data"})`

### Array
`$.pjax.submit('/', {method: 'POST'}, [{tag: 'input', name: 'name', value: 'data', attr: {type: 'text'}}])`
