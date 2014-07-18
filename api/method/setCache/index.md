---
layout: bootstrap
title: setCache
type: page
nav: nav
class: style-api style-api-detail
---

# setCache() <small><span class="label label-info">chainable</span></small>
プラグインキャッシュを設定します。

## setCache( Url: string, Data: string, textStatus: string, jqXHR: jQueryXHR ): this
`jqXHR.responseText`をベースに`Data`に存在するタイトルと更新範囲を上書きしたデータを更新に使用します。`Data`は`null`で省略できます。

## setCache( Url: string, Data: string ): this
上書き用のデータのみを設定します。`jqXHR`がない場合はページ遷移時に取得して補充されます。`Data`と`jqXHR`いずれもないキャッシュを作ることはできません。

## setCache( Url as string ): this
URLのページの`Data`パラメータによるプラグインキャッシュの上書きを削除します。

## setCache(): this
現在のページのプラグインキャッシュを設定します。
