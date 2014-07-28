# pjax
[![Build Status](https://travis-ci.org/falsandtru/jquery.pjax.js.svg?branch=master)](https://travis-ci.org/falsandtru/jquery.pjax.js)

**[Document](http://falsandtru.github.io/jquery.pjax.js/)**
 | 
**[Download](https://github.com/falsandtru/jquery.pjax.js/releases)**
 | 
**[d.ts](src/ts/.d/jquery.pjax.d.ts)**


pjaxとはリクエストと描画を最小限に抑えることで高速かつシームレスなページ遷移機能を提供する技術です。

主にページ遷移の高速化やウェブサービスのハイエンドなインターフェイスの実装に利用されます。

また、このpjaxではプリロードによる高速化とクライアントサイドロードバランサ(CsLB)によるネットワーク負荷分散を利用できます。

※ リリースバージョン(マスターブランチ)以外を本番環境で使用しないでください。データベースをアップデートできずスキーマの不整合によるエラーが発生する可能性があります。

## 特徴

* プリロードによる高速化
* CsLBによるネットワーク負荷分散
* CSS・SCRIPT・RSSなどHEAD要素の同期
* URL・TITLEなど項目別の更新無効化
* pjaxの一般的諸問題の解決

## ブラウザ
主要ブラウザに対応。

* IE10+
* Chrome
* Firefox
* Safari
* Opera
* Android
* iOS

## jQuery
jQuery1.6+推奨。

* v1.4.2
* v1.7.2
* v1.11.1
* v2.1.1
