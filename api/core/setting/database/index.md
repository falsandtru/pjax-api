---
layout: bootstrap
title: database
type: page
nav: nav
class: style-api style-api-detail
---

# database
IndexedDBの使用を設定します。初期値は`true`です。

ページデータは1000件、サーバーデータは100件がまで保持されます。データベースのサイズは最大1MB以下を見積もっています。データベースは暦日で10日経過後最初の`$.pjax()`実行時に初期化されます。

## database: boolean
IndexedDBの有効無効を切り替えます。

<pre class="sh brush: js;">
$.pjax({
  database: true
});
</pre>
