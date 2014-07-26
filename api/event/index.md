---
layout: bootstrap
title: Event
type: page
nav: nav
class: style-api style-api-detail
---

# Event

## pjax.request
ajaxリクエスト送信前に`document`オブジェクトから発生します。

## pjax.unload
ページデータの取得後、更新処理開始前に`window`オブジェクトから発生します。

## pjax.DOMContentLoaded
`area`で指定された範囲のDOMの更新後、`document`オブジェクトから発生します。CSSの更新とSCRIPTの実行は完了していません。

## pjax.ready
すべてのDOMの更新後、`document`オブジェクトから発生します。

## pjax.render
すべての更新範囲の描画後、`document`オブジェクトから発生します。

## pjax.load
すべての画像とフレームの読み込み後、`window`オブジェクトから発生します。
