---
layout: bootstrap
title: Callback
type: page
nav: nav
class: style-api style-api-detail
---

# Callback
コールバックの実行ポイントは数十箇所あり、詳細な実行タイミングを設定できます。また、戻り値の指定によりURLやTITLEなどほとんどの更新処理を個別に無効化できます。

## callback( event, param )
更新の描画後に実行されます。第二引数にpjax設定時に`param`パラメータに設定した値が渡されます。

## callbacks
多数のコールバック実行タイミングを持ちます。`update.any.before`で`false`を返すとページ更新処理のうちanyの示す部分の更新処理をキャンセルします。使用されない更新項目のコールバックは実行されません。

`ajax.success`、`ajax.error`、`ajax.complete`はjQuery1.8以降非推奨となったためjQuery1.6以降では`ajax.done`、`ajax.fail`、`ajax.always`を使用してください。

### ajax.xhr( event, param )
ajaxの同名のメソッド内で実行されます。外部から引き継いだリクエストでは実行されません。

### ajax.beforeSend( event, param, data, ajaxSettings )
〃

### ajax.dataFilter( event, param, data, dataType )
〃

### ajax.success( event, param, data, textStatus, jqXHR ) <small><span class="label label-warning">deprecated</span></small>
〃

### ajax.error( event, param, jqXHR, textStatus, errorThrown ) <small><span class="label label-warning">deprecated</span></small>
〃

### ajax.complete( event, param, jqXHR, textStatus ) <small><span class="label label-warning">deprecated</span></small>
〃

### ajax.done( event, param, data, textStatus, jqXHR ) <small><span class="label label-primary">jQuery1.6+</span></small>
ajax処理の成功時に実行されます。外部から引き継いだリクエストでも実行されます。

### ajax.fail( event, param, jqXHR, textStatus, errorThrown ) <small><span class="label label-primary">jQuery1.6+</span></small>
ajax処理の失敗時に実行されます。外部から引き継いだリクエストでも実行されます。

### ajax.always( event, param, jqXHR, textStatus ) <small><span class="label label-primary">jQuery1.6+</span></small>
ajax処理の完了後常に実行されます。外部から引き継いだリクエストでも実行されます。

### update.redirect.before( event, param, data, textStatus, jqXHR )
ページの更新処理においてリダイレクトの確認前に実行されます。

### update.redirect.after( event, param, data, textStatus, jqXHR )
ページの更新処理においてリダイレクトの確認後に実行されます。

### update.url.before( event, param, data, textStatus, jqXHR )
ページの更新処理においてURLの更新前に実行されます。

### update.url.after( event, param, data, textStatus, jqXHR )
ページの更新処理においてURLの更新後に実行されます。

### update.rewrite.before( event, param, cache )
ページの更新処理において更新元HTMLDocumentの書き換え前に実行されます。

### update.rewrite.after( event, param, cache )
ページの更新処理において更新元HTMLDocumentの書き換え後に実行されます。

### update.title.before( event, param, data, textStatus, jqXHR )
ページの更新処理においてタイトルの更新前に実行されます。

### update.title.after( event, param, data, textStatus, jqXHR )
ページの更新処理においてタイトルの更新後に実行されます。

### update.head.before( event, param, data, textStatus, jqXHR )
ページの更新処理においてHEAD要素の更新前に実行されます。

### update.head.after( event, param, data, textStatus, jqXHR )
ページの更新処理においてHEAD要素の更新後に実行されます。

### update.content.before( event, param, data, textStatus, jqXHR )
ページの更新処理においてコンテンツの更新前に実行されます。

### update.content.after( event, param, data, textStatus, jqXHR )
ページの更新処理においてコンテンツの更新後に実行されます。

### update.balance.before( event, param )
ページの更新処理においてロードバランスの周辺処理前に実行されます。

### update.balance.after( event, param )
ページの更新処理においてロードバランスの周辺処理後に実行されます。

### update.css.before( event, param, data, textStatus, jqXHR )
ページの更新処理においてCSSの読み込み前に実行されます。

### update.css.after( event, param, data, textStatus, jqXHR )
ページの更新処理においてCSSの読み込み後に実行されます。

### update.script.before( event, param, data, textStatus, jqXHR )
ページの更新処理においてJavaScriptの読み込み前に実行されます。

### update.script.after( event, param, data, textStatus, jqXHR )
ページの更新処理においてJavaScriptの読み込み後に実行されます。

### update.scroll.before( event, param )
ページの更新処理においてスクロール位置の更新前に実行されます。

### update.scroll.after( event, param )
ページの更新処理においてスクロール位置の更新後に実行されます。
