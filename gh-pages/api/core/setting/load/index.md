---
layout: bootstrap
title: load
type: page
nav: nav
class: style-api style-api-detail
---

# load
遷移先のCSSやJavaScriptなどの読み込みを設定します。

## load.head: string
HEAD要素内で同期させる要素をjQueryセレクタで設定します。対応している要素は`base`、`meta`、`link`要素のみです。CSSは除外されます。初期値は`''`です。

<pre class="sh brush: js;">
$.pjax({
  load: {
    head: 'base, meta, link'
  }
});
</pre>

## load.css: boolean
CSSを同期するかを設定します。初期値は`false`です。

<pre class="sh brush: js;">
$.pjax({
  load: {
    css: true
  }
});
</pre>

## load.script: boolean
JavaScriptを読み込むかを設定します。初期値は`false`です。

JavaScriptを実行順序を維持して読み込みます。同一の外部参照JavaScriptは1回だけ読み込まれ、インラインJavaScriptは繰り返し実行されます。

JavaScriptの実行時にエラーが発生した場合、エラーの伝搬後に`fallback`パラメータの設定に基づいたフォールバック処理が行われます。

<pre class="sh brush: js;">
$.pjax({
  load: {
    script: true
  }
});
</pre>

## load.ignore: string
同期、読み込みの対象としない要素をjQueryセレクタで設定します。初期値は`'[src*="jquery.js"], [src*="jquery.min.js"], [href^="chrome-extension://"]'`です。

## load.reload: string
繰り返し読み込む外部参照JavaScriptをjQueryセレクタで設定します。初期値は`''`です。

## load.log: string
実行した場合にDOMに追加するSCRIPT要素をその親要素を示すjQueryセレクタで設定します。初期値は`head, body`です。

jQueryセレクタにはIDまたはHEAD, BODYタグのみ使用できます。更新範囲内のSCRIPT要素はあらかじめ追加されるため除外されます。

## load.error: boolean/function(error, element)
読み込まれたJavaScriptの実行時に発生したエラーを通常どおり処理するかを設定します。`async`属性により非同期に読み込まれるものは無視されます。初期値は`true`です。

`true`を設定した場合、発生したエラーを隠蔽せず実行は中断されます。
`false`を設定した場合、エラーが発生しても隠蔽され実行を中断せず継続します。
関数を設定した場合、エラー発生時に実行され、第一引数にエラーオブジェクト、第二引数にエラーの発生源であるSCRIPT要素が渡されます。エラーを隠蔽せず透過的に処理する場合は引数として渡されたエラーオブジェクトを`throw`する処理を記述します。

<pre class="sh brush: js;">
$.pjax({
  load: {
    error: function (error, element) {
      if (true) {
        throw error;
      } else {
        console.log(error);
      }
    }
  }
});
</pre>

## load.ajax: object
外部参照JavaScriptを読み込む際に`ajax`パラメータへマージして使用する`$.ajax`のパラメータを設定します。設定値は初期値にマージされます。初期値は`{ dataType: 'script', cache: true }`です。

非同期設定は要素の`async`属性により設定されます。`async`プロパティの値が`true`であっても属性が設定されてない場合は属性を優先して`false`とみなします。
