---
layout: bootstrap
title: balance
type: page
nav: nav
class: style-api style-api-detail
---

# balance
ロードバランスを設定します。サーバーサイドのみでバランスする場合は設定する必要はありません。機能の解説は[Load Balancer](loadbalancer/)をお読みください。

**実験的な機能であり動作検証中です。不具合やご意見等ありましたらお寄せください。**

## balance.self: boolean
ブラウザでロードバランスを行うかを設定します。クッキーとIndexedDBを使用できる必要があります。初期値は`false`です。

<pre class="sh brush: js;">
$.pjax({
  balance: {
    self: true
  }
});
</pre>

## balance.weight: number
正規のリクエスト先以外のサーバーへのリクエストの加重を設定します。レスポンスによるサーバー選択の最適化と併用されます。初期値は`3`です。

最適化により正規のサーバーが選択されるべき場合でも加重数値の確率でしか選択しません。サーバー数5加重5の場合、100回のリクエスト中正規サーバーの選択は20回中16回がキャンセルされ、実際に選択される確率は全体の4%(36:36:36:4)、他のサーバーの1/9となります。

## balance.client.support: RegExp
ロードバランスを使用するブラウザを設定します。初期値は`/chrome|firefox|safari/i`です。

## balance.client.exclude: RegExp
除外するブラウザを設定します。初期値は`/msie|trident|mobile|phone|android|iphone|ipad|blackberry/i`です。

## balance.client.cookie: string
サーバーへのロードバランスの要求フラグを立てるクッキーのKeyを設定します。初期値は`'balanceable'`です。

## balance.server.header: string
リクエストのバランス先のサーバードメインを持つレスポンスヘッダフィールドを設定します。初期値は`'X-Ajax-Host'`です。

## balance.server.preclude: number
通信エラーが発生した場合にそのサーバーを使用しない時間をミリ秒で設定します。初期値は`10 * 60 * 1000`(10分)です。

## balance.log.expires: number
リクエスト先の候補を検索するサーバー通信ログの時間範囲を設定します。初期値は`1.5 * 24 * 60 * 60 * 1000`(過去1.5日)です。

## balance.log.limit: number
リクエスト先の候補を検索するサーバー通信ログの件数範囲を設定します。初期値は`10`(過去10件)です。

## balance.option: setting
ロードバランスを使用する場合に上書きするpjax設定を設定します。初期値は以下の通りです。クロスドメイン通信ではリクエストヘッダを設定できないことに注意してください。

```
option: {
  server: {
    header: false
  },
  ajax: {
    crossDomain: true
  },
  callbacks: {
    ajax: {
      beforeSend: null
    }
  }
}
```
