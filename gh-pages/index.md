---
layout: bootstrap
title: PJAX - Solution of Client-side Load Balancing
type: index
class: style-top
---

{::options parse_block_html="true" /}

高速化と負荷分散を実施する**プリロード**、**データバインディング補助**、**クライアントサイドロードバランサ**を備えたPJAXです。

<div class="row">

<div class="col-md-4">
## Introduction
pjaxはリクエストと描画を最小限に抑えた高速かつシームレスなページ遷移を提供する技術です。[>>more]({{ site.basepath }}introduction/)
</div>

<div class="col-md-4">
## Installation
既存のサイトを変更することなく、JavaScriptを2つ追加するだけでpjaxを導入することができます。[>>more]({{ site.basepath }}installation/)
</div>

<div class="col-md-4">
## API
多様な環境と用途に対応できるよう詳細な設定項目を提供しています。[>>more]({{ site.basepath }}api/)
</div>

</div>

<div class="row">

<div class="col-md-4">
## Guide
実装方法などの案内です。[>>more]({{ site.basepath }}guide/)

* preload
* Google Analytics
* Loading Effect
* Progressbar
* Wordpress Plugin
* パフォーマンスチューニング
* JavaScriptの状態管理

</div>

<div class="col-md-4">
## Cs Load Balancer
リクエストを分散させることで回線帯域を**1.5-20倍**程度にスケールアウトします。100Mbps回線であれば**最大2.0Gbps(2000Mbps)**の大容量回線を複数のサーバー回線を使用して疑似的に構築できます。

専用機器や大容量回線を導入せずとも非常に安価に大量のトラフィックを処理できるようになります。[>>more]({{ site.basepath }}client-side-load-balancer/)

</div>

<div class="col-md-4">
## Overlay
ハッシュリンクによりコンテンツを[このように]({{ site.basepath }}#overlay)オーバーレイ表示するおまけ機能です。IE10未満のレガシーブラウザでは動作しません。

<div class="overlay">
info
</div>
</div>

</div>

<div class="row">

<div class="col-md-4">
## Browser
主要ブラウザに対応しています。[>>more]({{ site.basepath }}#browser)

* IE10+
* Chrome
* Firefox
* Safari
* Opera
* Android
* iOS

<aside class="overlay">
下記の主要ブラウザで動作します。タッチデバイスではpreloadを使用できないため高速化の効果は限定的なものとなります。

* IE10+
* Chrome
* Firefox
* Safari
* Opera
* Android
* iOS

</aside>

</div>

<div class="col-md-4">
## jQuery
jQuery1.6+推奨です。jQuery1.4.2から動作しますが機能が制限されます。[>>more]({{ site.basepath }}#jquery)

* v1.4.2
* v1.7.2
* v1.11.3
* v2.1.4

<aside class="overlay">
jQuery1.6+を推奨します。jQuery1.4.2から動作しますが、`wait`パラメータや`follow`メソッドなどいくつかの機能が使用できません。
</aside>

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
[>>more]({{ site.basepath }}changelog/)
</div>

<div class="col-md-4">
## License
MIT Licenseで公開しています。商用非商用を問わず無償無許諾で使用・改変できます。すべてのコンテンツは無保証であり開発者は一切責任を負いません。著作権表示と本許諾表示は必要です。[>>more](https://github.com/falsandtru/jquery-pjax/blob/master/LICENSE)
</div>

</div>
