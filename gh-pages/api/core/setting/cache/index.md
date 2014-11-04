---
layout: bootstrap
title: cache
type: page
nav: nav
class: style-api style-api-detail
---

# cache
キャッシュ(プラグインキャッシュ)の使用を設定します。キャッシュはJavaScriptの変数に保持されます。

## cache.click: boolean
リンクのクリックによるページ遷移にプラグインキャッシュを使用するかを設定します。初期値は`false`です。

<pre class="sh brush: js;">
$.pjax({
  cache: {
    click: true
  }
});
</pre>

## cache.submit: boolean
フォームの送信によるページ遷移にプラグインキャッシュを使用するかを設定します。初期値は`false`です。

<pre class="sh brush: js;">
$.pjax({
  cache: {
    submit: true
  }
});
</pre>

## cache.popstate: boolean
ブラウザ操作によるページ遷移にプラグインキャッシュを使用するかを設定します。初期値は`false`です。

<pre class="sh brush: js;">
$.pjax({
  cache: {
    popstate: true
  }
});
</pre>

## cache.get: boolean
フォームのGET送信により取得したページをキャッシュするかを設定します。初期値は`true`です。

## cache.post: boolean
フォームのPOST送信により取得したページをキャッシュするかを設定します。初期値は`true`です。

## cache.limit: boolean
プラグインキャッシュを保持するページ数の上限を設定します。設定値`0`は無制限となります。初期値は`100`です。

## cache.mix: number
ブラウザキャッシュが存在するとみなす場合にpjaxをキャンセルして通常のページ遷移を行います。ブラウザキャッシュが存在するとみなすajaxによるページ取得に要した時間の上限をミリ秒で設定します。有効にする場合は`50`(ミリ秒)程度の設定値を推奨します。初期値は`0`(無効)です。

## cache.expires: object
プラグインキャッシュの期限にかかる設定項目を持ちます。プラグインキャッシュの期限にはブラウザキャッシュに設定された期限が使用されますがこの設定により修正することもできます。

## cache.expires.min: number
プラグインキャッシュの期限の最小値をミリ秒で設定します。初期値は`1800000`(30分)です。

## cache.expires.max: number
プラグインキャッシュの期限の最大値をミリ秒で設定します。初期値は`null`(無制限)です。
