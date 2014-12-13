---
layout: bootstrap
title: database
type: page
nav: nav
class: style-api style-api-detail
---

# database
IndexedDBの使用を設定します。

ページデータは300件、サーバーデータは100件まで保持されます。データベースのサイズは最大100KB以下を見積もっています。

## database.active: boolean
データベースの使用不使用を切り替えます。初期値は`true`です。

## database.revision: number
データベースをリビジョンの更新ごとに初期化します。初期値は`0`です。

## database.refresh: number
データベースを初期化する間隔を日数で設定します。初期値は`10`、上限が`30`です。
