---
layout: bootstrap
title: Installation
type: page
nav: nav
class: style-info
---

# Installation
基本的にjQueryとスクリプトを追加するだけで動作します。

CSS等は自動的に同期されるためページ間のJavaScriptの干渉にだけ気をつければpjaxを使用していることを意識する必要はありません。

<pre class="sh brush: html;">
&lt;script charset="utf-8" src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"&gt;&lt;/script&gt;
&lt;script charset="utf-8" src="/js/jquery.pjax.js"&gt;&lt;/script&gt;
</pre>

<pre class="sh brush: js;">
$.pjax({
  area: 'body',
  load: { head: 'base, meta, link', css: true, script: true },
  cache: { click: true, submit: false, popstate: true },
  server: { query: null }
});
</pre>

※ 速度面で格段に優れるため[preload](guide/)とあわせて使用することを推奨します。  
※ **リリースバージョン(マスターブランチ)以外を本番環境で使用しないでください。データベースをアップデートできずデータベーススキーマの不整合によるエラーが発生する可能性があります。**
