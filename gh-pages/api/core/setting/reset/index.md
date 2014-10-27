---
layout: bootstrap
title: reset
type: page
nav: nav
class: style-api style-api-detail
---

# reset
メモリリーク対策としてJavaScriptの実行状態をリセットする条件を設定します。

指定のイベントタイプでpjaxによりページ遷移する際であって他のいずれかの条件を満たしている場合に通常のページ遷移を行うことでJavaScriptの使用しているメモリを解放します。
`GET`以外のメソッドが指定されているFORM要素が存在する場合はリセットが延期されます。

## reset.type: string
リセットの対象とするイベントタイプを設定します。`''`を設定すると無効となります。初期値は`''`です。

<pre class="sh brush: js;">
$.pjax({
  reset: {
    type: 'click popstate'
  }
});
</pre>

## reset.count: number
リセットの対象とするページ遷移回数の下限を設定します。`0`を設定すると無制限となります。初期値は`100`です。

<pre class="sh brush: js;">
$.pjax({
  reset: {
    count: 0
  }
});
</pre>

## reset.time: number
リセットの対象とする実行時間の下限をミリ秒で設定します。`0`を設定すると無制限となります。初期値は`10800000`(3時間)です。

<pre class="sh brush: js;">
$.pjax({
  reset: {
    time: 0
  }
});
</pre>
