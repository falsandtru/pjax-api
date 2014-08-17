---
layout: bootstrap
title: fallback
type: page
nav: nav
class: style-api style-api-detail
---

# fallback
pjaxによるページ遷移が失敗した場合にフォールバック処理として通常のページ遷移を行うかを設定します。初期値は`true`です。

## fallback: boolean
フォールバック処理の有効無効を切り替えます。

## fallback: function( event, param, origUrl, destUrl )
フォールバック処理前に関数を実行します。戻り値に`false`を設定した場合、既定のフォールバック処理をキャンセルします。
