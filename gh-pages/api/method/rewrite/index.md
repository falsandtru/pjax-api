---
layout: bootstrap
title: rewrite
type: page
nav: nav
class: style-api style-api-detail
---

# rewrite() <small><span class="label label-info">chainable</span></small>
`rewrite`パラメータに設定した関数により現在のページを書き換えます。書き換えは常に遅延実行されます。キャッシュを使用できない場合はサーバーへのリクエストが発生します。

書き換えは`click`メソッドによるページの再読み込みにより行われます。この際`load`パラメータによる機能はすべて無効化されます。コールバックとイベントは通常通り実行されます。

## rewrite(): this
`rewrite`パラメータに設定した関数により現在のページを書き換えます。

<pre class="sh brush: js;">
$.pjax({
  rewrite: function (document) {
    // src属性値の変更によるリクエストのキャンセルをChromeで利用できます(Firefox,IE不可)
    $('#primary', document)
    .find('img:gt(3)').not('[data-original]')
    .each(function(){
      this.setAttribute('data-original', this.src);
      this.setAttribute('src', '/img/gray.gif');
    }).addClass('delay');
  }
}).rewrite();
</pre>
