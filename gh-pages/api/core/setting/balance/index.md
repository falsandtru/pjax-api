---
layout: bootstrap
title: balance
type: page
nav: nav
class: style-api style-api-detail
---

# balance
ロードバランスを設定します。サーバーサイドのみでバランスする場合は設定する必要はありません。機能の解説は[Client-side Load Balancer](client-side-load-balancer/)をお読みください。

サーバーの選択は以下のように最適化されます。

* 応答性能の高い順にサーバーを選定
* 応答速度の遅いサーバーは除外
* 加重に応じて正規サーバーと非正規サーバーの選択確率を調整
* 上位6つのサーバーからランダムに選択
* キャッシュの有効期限内では同じサーバーを選択

## balance.active: boolean
ブラウザでロードバランスを行うかを設定します。IndexedDBを使用できない場合、機能と性能が制限されます。初期値は`false`です。

<pre class="sh brush: js;">
$.pjax({
  balance: {
    active: true
  }
});
</pre>

## balance.weight: number
正規のリクエスト先以外のサーバーへのリクエストの加重を設定します。レスポンスによるサーバー選択の最適化と併用されます。初期値は`1`です。

最適化により正規のサーバーが選択されるべき場合でも加重数値に比例する確率でしか選択しません。サーバー数5加重5の場合、100回のリクエスト中正規サーバーの選択は20回中16回がキャンセルされ、実際に選択される確率は全体の4%(24:24:24:24:4)、他のサーバーの1/6となります。

## balance.option: setting
ロードバランスを使用する場合に上書きするpjax設定を設定します。初期値は以下の通りです。クロスドメイン通信ではリクエストヘッダを設定できないことに注意してください。

<pre class="sh brush: js;">
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
</pre>

## balance.client.hosts: array
リクエストのバランス先を設定します。`balance.server.header`による設定がより適切です。初期値は`[]`です。

## balance.client.support.browser: RegExp
ロードバランスを使用するブラウザを設定します。初期値は`/msie|trident.+ rv:|chrome|firefox|safari/i`です。

## balance.client.support.redirect: RegExp
リダイレクト可能なブラウザを設定します。初期値は`/chrome|firefox|safari/i`です。

## balance.client.cookie.balance: string
リクエストヘッダにロードバランスの要求フラグを立てるCookieのキーを設定します。初期値は`'balanceable'`です。

## balance.client.cookie.redirect: string
リクエストヘッダにリダイレクトの要求フラグを立てるCookieのキーを設定します。初期値は`'redirectable'`です。

## balance.client.cookie.host: string
IndexedDBが使用できない場合にリクエスト先の代替保存先として使用するCookieのキーを設定します。初期値は`'host'`です。

## balance.server.header: string
リクエストのバランス先のサーバードメインを持つレスポンスヘッダフィールドを設定します。初期値は`'X-Ajax-Host'`です。

## balance.server.respite: number
通信エラーが発生した場合にそのサーバーを使用しない時間をミリ秒で設定します。初期値は`10 * 60 * 1000`(10分)です。

## balance.server.expires: number
サーバー情報の有効期限を設定します。初期値は`10 * 24 * 60 * 60 * 1000`(過去10日)です。
