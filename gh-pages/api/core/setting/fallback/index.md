---
layout: bootstrap
title: fallback
type: page
nav: nav
class: style-api style-api-detail
---

# fallback
pjaxによるページ遷移が失敗した場合の処理を設定します。初期設定は代替処理として通常のページ遷移が行われます。関数が設定された場合は代替処理が設定された関数により上書きされます。処理はエラーにかかるコールバック実行後に行われます。初期値は`true`です。

## fallback: boolean
代替処理の有効無効を切り替えます。

## fallback: function( event, param, origUrl, destUrl )
代替処理を上書きします。
