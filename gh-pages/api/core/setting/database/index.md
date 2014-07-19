---
layout: bootstrap
title: database
type: page
nav: nav
class: style-api style-api-detail
---

# database
IndexedDBの使用を設定します。データはデータ数が1000を超えるたびに最後のアクセスから3日（72時間）以上経過したデータが削除（削除後もデータ数が1000を超えている場合はすべてのデータを削除）され、データベースは暦日で10日ごとに日付変更後最初の`$.pjax()`実行時に初期化されます。データベースのサイズは最大1MB以下を見積もっています。初期値は`true`です。

## database: boolean
IndexedDBの有効無効を切り替えます。

<pre class="sh brush: js;">
$.pjax({
  database: true
});
</pre>
