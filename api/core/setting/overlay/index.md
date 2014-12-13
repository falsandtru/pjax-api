---
layout: bootstrap
title: overlay
type: page
nav: nav
class: style-api style-api-detail
---

# overlay <small><span class="label label-warning">IE10+</span></small>
ハッシュリンクにコンテンツのポップアップ表示機能を追加します。初期値は`''`です。

pjaxのシンプルな補助機能です。ハッシュと一致するDOM要素およびその後続の次のヘッディング・コンテンツが現れるまでの兄弟要素に含まるパラメータに一致する最初の要素がポップアップします。パラメータに一致する要素がない場合は既定の動作となります。
IE10未満のpjaxを使用できないレガシーブラウザでは動作しないため互換性の確保には独自の対応が必要です。

<a href="demo/overlay/" target="_blank" class="btn btn-primary" role="button">demo</a>

## overlay: string
jQueryセレクタによりポップアップさせるDOM要素を設定します。

<pre class="sh brush: js;">
$.pjax({
  overlay: '.overlay'
});
</pre>

<pre class="sh brush: html;">
&lt;style&gt;
.overlay {
  display: none;
  max-width: 1000px;
  max-height: 80%;
  min-width: 15%;
  min-height: 30%;
  margin: auto;
  padding: 2em;
  border: none;
  background: #fff;
  box-shadow: 2px 2px 10px 1px rgba(0,0,0,0.4);
}
&lt;/style&gt;
&lt;div id="hash1" class="overlay"&gt;
  &lt;p&gt;popup1&lt;/p&gt;
&lt;/div&gt;
&lt;div id="hash2"&gt;
  &lt;p class="overlay"&gt;popup2&lt;/p&gt;
&lt;/div&gt;
&lt;div id="hash3" class="overlay"&gt;
  &lt;p&gt;popup3&lt;/p&gt;
&lt;/div&gt;
</pre>
