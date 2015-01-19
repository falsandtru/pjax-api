---
layout: bootstrap
title: Event
type: page
nav: nav
class: style-api style-api-detail
---

# Event
ページの更新処理において発生します。

## pjax:fetch
Ajaxリクエストの送信、引き継ぎ、キャッシュ適用、いずれかのデータ取得処理前に`document`オブジェクトから発生します。

## pjax:unload
データの取得後、ページの更新前に`window`オブジェクトから発生します。

## pjax:DOMContentLoaded
`area`で指定された範囲のDOMの更新後、`document`オブジェクトから発生します。

## pjax:ready
SCRIPT要素を除くすべてのDOMの更新後、`document`オブジェクトから発生します。

## pjax:render
すべての更新範囲の描画後、`document`オブジェクトから発生します。

## pjax:load
すべての画像(IMG要素)の読み込み後、`window`オブジェクトから発生します。
