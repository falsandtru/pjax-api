---
layout: bootstrap
title: server
type: page
nav: nav
class: style-api style-api-detail
---

# server
サーバーへのリクエストを設定します。

## server.query
サーバーへのリクエストURLに付加するクエリを設定します。このクエリは内部処理でのみ使用され閲覧者の目に触れることはありません。ブラウザのキャッシュはクエリに応じて個別に生成されるためプリロードと組み合わせる場合は注意が必要です。初期値は`'pjax=1'`です。

### server.query: string
サーバーへのリクエストURLに付加するクエリを文字列で設定します。

<pre class="sh brush: js;">
$.pjax({
  server: {
    query: 'pjax=1'
  }
});
</pre>

### server.query: object
サーバーへのリクエストURLに付加するクエリをオブジェクトで設定します。

<pre class="sh brush: js;">
$.pjax({
  server: {
    query: {
      pjax: 1
    }
  }
});
</pre>

## server.header
サーバーへリクエストヘッダの付加を切り替えます。`true`を設定すると`X-Pjax: true`がヘッダに追加されます。

<pre class="sh brush: js;">
$.pjax({
  server: {
    header: false
  }
});
</pre>

## server.header: object
サーバーへリクエストヘッダに付加するフィールドの設定項目を持ちます。いずれかのフィールドを有効にした場合、`X-Pjax: true`もヘッダに追加されます。

## server.header.area: boolean
`X-Pjax-Area`フィールドに更新範囲の通知を設定します。初期値は`false`です。

<pre class="sh brush: js;">
$.pjax({
  server: {
    header: {
      area: true
    }
  }
});
</pre>

## server.header.head: boolean
`X-Pjax-Head`フィールドにHEAD要素同期の有効無効の通知を設定します。初期値は`false`です。

## server.header.css: boolean
`X-Pjax-CSS`フィールドにCSS読み込みの有効無効の通知を設定します。初期値は`false`です。

## server.header.script: boolean
`X-Pjax-Script`フィールドにJavaScript読み込みの有効無効の通知を設定します。初期値は`false`です。
