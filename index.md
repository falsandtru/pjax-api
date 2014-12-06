---
layout: bootstrap
title: PJAX
type: index
class: style-top
---

{::options parse_block_html="true" /}

**PJAX**はプリロードによる**0.5秒の高速化**とクライアントサイドロードバランサによる**最大2.0Gbpsの大容量回線**を提供します。

<div class="row">

<div class="col-md-4">
## Introduction
pjaxはリクエストと描画を最小限に抑えた高速かつシームレスなページ遷移を提供する技術です。

また、このpjaxではプリロードによる高速化とクライアントサイドロードバランサ(CsLB)によるネットワーク負荷分散を利用できます。[>>more](introduction/)
</div>

<div class="col-md-4">
## DEMO

* <a href="demo/falsandtru/" target="_blank">Major feature</a>
* <a href="demo/balance/" target="_blank">Client-side Load Balancer</a>

</div>

<div class="col-md-4">
## Installation
既存のサイトを変更することなく、JavaScriptを2つ追加するだけでpjaxを導入することができます。[>>more](installation/)
</div>

</div>

<div class="row">

<div class="col-md-4">
## API
多様な環境と用途に対応できるよう詳細な設定項目を提供しています。[>>more](api/)
</div>

<div class="col-md-4">
## Guide
実装方法などの案内です。[>>more](guide/)

* preload
* Google Analytics
* Loading Effect
* Progressbar
* Wordpress Plugin
* JavaScriptの状態管理
</div>

<div class="col-md-4">
## Load Balancing
リクエストを分散させることで回線帯域を**1.5-20倍**程度にスケールアウトします。100Mbps回線であれば**最大2.0Gbps(2000Mbps)**の大容量回線を複数のサーバー回線を使用して疑似的に構築できます。

専用機器や大容量回線を導入せずとも非常に安価に大量のトラフィックを処理できるようになります。[>>more](client-side-load-balancer/)

</div>

</div>

<div class="row">

<div class="col-md-4">
## Browser
主要ブラウザに対応しています。[>>more](browser/)

* IE10+
* Chrome
* Firefox
* Safari
* Opera
* Android
* iOS
</div>

<div class="col-md-4">
## jQuery
jQuery1.6+推奨です。jQuery1.4.2から動作しますが機能が制限されます。[>>more](jquery/)

* v1.4.2
* v1.7.2
* v1.11.1
* v2.1.1
</div>

<div class="col-md-4">
## Wordpress
Wordpressプラグインをサンプルとして提供しています。使用方法はインストールするだけで、基本的に設定は不要です。[>>more](http://wordpress.org/plugins/wp-preload-pjax/)
</div>

</div>

<div class="row">

<div class="col-md-4">
## Framework
TypeScriptとMVCモデルを使用したフレームワーク｢*TypeScriptMVCTemplate*｣で開発されています。[>>more](http://falsandtru.github.io/TypeScriptMVCTemplate/)
</div>

<div class="col-md-4">
## ChangeLog
[>>more](changelog/)
</div>

<div class="col-md-4">
## License
MIT Licenseで公開しています。商用非商用を問わず無償無許諾で使用・改変できます。すべてのコンテンツは無保証であり開発者は一切責任を負いません。著作権表示と本許諾表示は必要です。[>>more](https://github.com/falsandtru/jquery-pjax/blob/master/LICENSE)
</div>

</div>
