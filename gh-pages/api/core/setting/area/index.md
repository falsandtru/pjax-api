---
layout: bootstrap
title: area
type: page
nav: nav
class: style-api style-api-detail
---

# area
更新範囲を設定します。初期値は`'body'`です。

<a href="{{ site.basepath }}demo/area/" target="_blank" class="btn btn-primary" role="button">demo</a>

## area: string
文字列により更新範囲を設定します。更新範囲はカンマ区切りで複数設定できます。
更新範囲数が更新元と更新先で一致しない、または列挙した更新範囲がそろっていない場合はエラーとなります。
列挙した更新範囲は逆順で個別に評価されるためマイナーな範囲かつ高速なクエリから後に書いていくと高速に評価されます。

<pre class="sh brush: js;">
$.pjax({
  area: '#header, #primary, #secondary'
});
</pre>

## area: array
配列により更新範囲を設定します。先頭から順に使用できる更新範囲を走査します。

<pre class="sh brush: js;">
$.pjax({
  area: [
    '#header, #primary, #secondary',
    '#container',
    'body'
  ]
});
</pre>
