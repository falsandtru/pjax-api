---
layout: bootstrap
title: Introduction
type: page
nav: nav
class: style-info
---

# Introduction
pjaxはリクエストと描画を最小限に抑えた高速かつシームレスなページ遷移を提供します。
主にページ遷移の高速化やウェブサービスのハイエンドなインターフェイスの実装に利用されます。

このpjaxは数行のスクリプトの追加のみで既存のサイトに導入できるようサイト構成やページ構造に依存しない互換性を最優先に実装されています。

プリロードによる高速化とクライアントサイドロードバランサ(CsLB)によるネットワーク負荷分散を利用できます。

<pre class="sh brush: js;">
// Major feature activation
$.pjax({
  area: [
    '#header, #primary, #secondary',
    '#container',
    'body'
  ],
  load: {
    head: 'base, meta, link',
    css: true,
    script: true
  },
  cache: {
    click: true, submit: true, popstate: true,
    get: true, post: false
  },
  rewrite: function(document, area) {
    $(area, document).find('img').each(function(){
      this.setAttribute('data-original', this.src);
      this.setAttribute('src', '/img/gray.gif');
    }).addClass('delay');
  },
  scope: {
    search: ['/search/'],
    $search: { form: 'form:not([method])' },
    '/': ['/', '#search', '!/contact/']
  }
});

// 6 events and 30 callbacks exists.
$(document).bind('pjax:ready', function() {
  //$("img.delay").lazyload();
});
</pre>

## 特徴

* プリロードによる高速化
* クライアントサイドロードバランサによるネットワーク負荷分散
* CSS・SCRIPT・RSSなどHEAD要素の同期
* URL・TITLEなど項目別の更新無効化
* pjaxの一般的諸問題の解決

## 機能

* Ajax処理の継承
* RSS・viewport等の同期
* CSSの同期
* JavaScriptの読み込み
* 複数範囲の更新
* 更新範囲の候補設定
* pjaxを使用するURL範囲の設定

## preload + pjax
GoogleやAmazonが示すように、ページのロードタイムを1秒前後にまで改善したあとさらに短くする0.1秒には莫大な価値があります。preloadとpjaxはこの価値を約0.5秒分提供します。

preloadとpjaxの併用は、スクリプトファイルを置くだけでページの表示(移動)にかかる時間を約0.5秒短縮する手軽で効果の高い高速化手法です。ここで使用するpjaxは高度に自動化されているためHTMLやCSSがページごとにバラバラでも動作します。スクリプトと動的に追加される要素には注意が必要ですがpjaxの`load.reload`と`load.ignore`パラメータを調整するだけでプラグインを数十個入れたWordpressのような複雑なサイトでも快適に使用できます。ただし、タッチ操作ではpreloadを使用できず効果がいまひとつのため無効にします。

ページロードがどれだけ速くなったかをコンソールの出力から確認できます。以下の出力はクリックの310ミリ秒前にリンク先のページの取得を開始し、クリックから450ミリ秒で表示されたときのものです。

<pre class="sh brush: js;">
[-310, 1, 361, 379, 403, 424, 450, 486, 487, 491]
["preload(-310)", "continue(1)", "load(361)", "parse(379)", "head(403)", "content(424)", "css(450)", "script(486)", "renderd(487)", "defer(491)"]
</pre>

※jQuery1.6+
※Windows7+Chromeで計測

通常はリンクのクリックからHTMLファイルのダウンロード完了まで0.5～1秒、ページの表示（DOMロード）にさらに1秒の合計2秒前後かかるページ移動をpreload+pjaxではクリックからページの表示まで0.5秒（500ミリ秒）前後で完了することができます。PCでは多分これが一番速いと思います。

|パターン|HTMLダウンロード|DOMロード|合計|
|:---|:--:|:--:|:--:|
|Normal|500-1000ms|800-1600ms|1300-2600ms|
|preload+pjax|0-700ms|50-100ms|50-800ms|

## Client-side Load Balancer
通常のロードバランサと異なり、ルーターやロードバランサなどのハードウェアを使用せず回線帯域を約1.5-20倍に増設・分散する効果を得られます。詳細は[Client-side Load Balancer](client-side-load-balancer/)をお読みください。

## pjaxの諸問題の解決
pushStateまたはreplaceStateとAjaxを組み合わせたいわゆるpjaxと呼ばれる機能には下記の問題が存在しています。当プラグインはこれらの問題の解決するための処理を組み込んでいます。

### locationオブジェクトとアドレスバーのURLの不一致
AndroidとiOSでは`location`オブジェクトが`pushState`を実行しても更新されず、ブラウザのアドレスバーに表示されるURLと`location.href`により取得するURLが一致しないバグがあります。

この問題は下の比較デモで確認できます。この問題を解決しない場合、ページのURLを参照するすべてのスクリプトが正常に動作できなくなり致命的なバグが発生する可能性があります。当プラグインはブラウザバックによりURLを再度認識させることでこの問題を解決しています。

### ブラウザ履歴の破壊
Ajax通信が強制終了されたページのタイトルが直近の正常に表示されたページのタイトルで上書きされ、間違った履歴が記録される問題があります。

この問題はpjaxにより2回以上ページ移動後、ページをリロードしブラウザの戻るボタンでページを読み込む時間を与えず2回以上ページを戻ることで確認できます。当プラグインではこの問題をブラウザに内蔵されているデータベースを利用することで概ね解決しています。

### スクロール位置の非復元
ブラウザの戻る/進む機能によりページを移動した場合に移動先ページの直前のスクロール位置が復元されないことがある問題があります。

この問題は3000pxスクロールしているページから1000pxの高さのページに移動して前のページに戻ると1000px付近までしかスクロールされないといった形で確認できます。当プラグインではこの問題をブラウザに内蔵されているデータベースを利用することで概ね解決しています。

## Turbolinks・defunkt版との比較
このpjaxプラグインは独自に開発されており、本家defunkt版の派生ではないため仕様が異なります。

defunkt版は一部のページに存在するコンポーネントの操作が主眼となる実装であるのに対し、当プラグインのpjaxはサイト全体で通常のページ遷移と置き換えての高速化が主目的となっており、RailsのTurbolinksの高機能版に近いものです(コンポーネントへのみの限定的な使用もできます)。なお、高速化はプリロードとの併用が前提です。

Turbolinks、defunkt版（v1.7.0/2013年6月時点最新版）との主な違いは次のとおりです。

|項目|defunkt|falsandtru|Turbolinks|
|:---|:-------:|:----------:|:----------:|
|jQueryバージョン対応|1.8.x|1.4.2|-|
|プリロードの利用|×|○|×|
|ロードバランス機能|×|○|×|
|history.stateの不使用|×|○|×|
|Android・iOSへの対応<br><small>- locationオブジェクトの更新</small>|**×**|○|?|
|Android・iOSへの対応<br><small>- スクロール位置の操作</small>|×|○|○|
|間違った履歴の修復|**×**|○|**×**|
|スクロール位置の復元|**×**|○|**×**|
|ページ移動方法の自動切替<br><small>- HTML以外のコンテントタイプの除外</small>|×|○|○|
|外部JavaScriptの実行|○|○|×|
|インラインJavaScriptの実行|×|○|○|
|JavaScriptの実行順序維持|×|○|○|
|CSSの同期|×|○|×|
|RSS等HEAD要素の同期|×|○|×|
|キャッシュ制御|×|○|×|
|キャッシュ無効|×|○|○|
|キャッシュ作成タイミング|ページ離脱時|ページ取得時＋任意|ページ取得時＋任意|
|適用URL範囲の設定|×|○|×|
|適用URL範囲別の設定|×|○|×|
|複数範囲の更新|×|○|×|
|更新範囲の候補設定|×|○|×|
|ユーザー定義関数の実行形式|イベント|コールバック＋イベント|イベント|
|ユーザー定義関数の設定箇所|9|30+6|7|
|部分更新キャンセル|×|○|×|
|比較デモ|<a href="demo/defunkt/" target="_blank">defunkt</a>|<a href="demo/falsandtru/" target="_blank">falsandtru</a>|-|
|CsLBデモ|-|<a href="demo/balance/" target="_blank">Client-side <br>Load Balancer</a>|-|
