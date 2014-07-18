---
layout: bootstrap
title: getCache
type: page
nav: nav
class: style-api style-api-detail
---

# getCache()
プラグインキャッシュを取得します。戻り値は以下のプロパティを持ちます。

```
data: string
textStatus: string
jqXHR: jqXHR
expires: number
```

## getCache( Url: string ): cache
URLのページのプラグインキャッシュを取得します。

## getCache(): cache
現在のページのプラグインキャッシュを取得します。
