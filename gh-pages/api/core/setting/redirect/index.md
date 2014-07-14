---
layout: bootstrap
title: redirect
type: page
nav: nav
class: style-api style-api-detail
---

# redirect
リダイレクト先への再移動にpjaxを使用するかを設定します。レスポンスヘッダによるリダイレクトは動作が不確実であるためHTMLのMETAタグによるリダイレクトと併用してください。また、レスポンスヘッダによるリダイレクトはリダイレクト前のURLでリダイレクト後のページが表示されるため注意してください。初期値は`true`です。

## redirect: boolean
リダイレクトの有効無効を切り替えます。
