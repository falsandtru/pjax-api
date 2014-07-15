---
layout: bootstrap
title: click
type: page
nav: nav
class: style-api style-api-detail
---

# click() <small><span class="label label-info">chainable</span></small>
クリックによるpjaxを使用したページ遷移を行います。pjaxを使用できない場合は通常のページ遷移にフォールバックされます。

## click( Anchor: jQuery): this
渡されたアンカーリンクを使用します。

## click( Anchor: element ): this
渡されたアンカーリンクを使用します。

## click( Url: string [, Attribute: object ] ): this
渡されたデータを元にアンカーリンクを生成して使用します。第二引数のプロパティがアンカーリンクの属性となります。
