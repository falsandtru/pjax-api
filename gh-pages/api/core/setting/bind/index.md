---
layout: bootstrap
title: bind
type: page
nav: nav
class: style-api style-api-detail
---

# bind <small><span class="label label-primary">jQuery1.6+</span></small>
データバインディングに使用するデータのリクエストを設定します。初期値は`null`です。
ページロード時のバインディングデータの提供機能でありバインディング機能自体ではありません。
このデータリクエストは`cache`パラメータの設定にかかわらずキャッシュされません。

ページ構築のようなサーバーのアプリケーション処理をクライアントへ委譲しデータバインディングとして処理させるために使用します。
サーバー処理をデータベースに格納されたページテンプレートとバインディングデータをほぼそのまま出力するだけで済ませられます。
Node + NoSQL構成のサーバーで利用することで高いパフォーマンスを得られます。

## bind: function( event, setting, origLocation, destLocation ): JQueryAjaxSettings

<pre class="sh brush: js;">
$.pjax({
  bind: function (event, setting, orig, dest) {
    dest.pathname = dest.pathname.replace(/(?:()\.\w+|([^/.]*))$/, '$1.json');
    return {
      url: dest.href,
      dataType: 'json',
      timeout: 2500
    };
  },
  rewrite: function(document, area, host, data) {
    if (!data) {return;}
    $('h1', document).text(data.text);
  }
});
</pre>
