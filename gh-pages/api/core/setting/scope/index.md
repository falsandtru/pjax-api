---
layout: bootstrap
title: scope
type: page
nav: nav
class: style-api style-api-detail
---

# scope
ページ遷移にpjaxを使用するURLを設定します。設定はサブディレクトリにも適用されます。初期値は`null`です。

## scope: object
ルートパスをキーとするハッシュテーブルによりURLごとの動作を設定します。キーは遷移先のURLが使用されます。値に遷移元と遷移先に前方一致するURLを設定します。

<pre class="sh brush: js;">
$.pjax({
　　scope: {
    // `/about/`と`/blog/`ディレクトリ下でのみpjaxを使用する。
    '/': ['/about/', '/blog/']
  }
});
</pre>

文字列を値に設定するとその文字をキーとする値にリダイレクトします。

<pre class="sh brush: js;">
$.pjax({
　　scope: {
    // `/about/`と`/blog/`ディレクトリ下でのみpjaxを使用する。
    'pattern': ['/about/', '/blog/'],
    '/': 'pattern'
  }
});
</pre>

`'$'`接頭辞を使用してpjax設定を上書きできます。遷移先URLに一致するパターンのみ使用されます。

<pre class="sh brush: js;">
$.pjax({
　　scope: {
    // `/search/`ディレクトリ下ではGET送信フォームでpjaxを使用する。
    '$/search/': {form: 'form:not([method])'},
    '/search/': ['/search/']
  }
});
</pre>

`'*'`接頭辞により正規表現を使用できます。

<pre class="sh brush: js;">
$.pjax({
　　scope: {
    // `/about/`と`/blog/`ディレクトリ下でのみpjaxを使用する。
    '/': ['*/(about|blog)/']
  }
});
</pre>

`'!'`接頭辞により否定表現を使用できます。

<pre class="sh brush: js;">
$.pjax({
　　scope: {
    // `/board/`と`/contact/`ディレクトリ下を除くすべてのページでpjaxを使用する。
    '/': ['/', '!*/(board|contact)/']
  }
});
</pre>

`'inherit'`キーワードを指定すると直近のハッシュキーで動作が確定しなかった場合に、さらに上位のディレクトリのハッシュキーを適用します。

<pre class="sh brush: js;">
$.pjax({
　　scope: {
    // `/contact/*.php`を除くすべてのページでpjaxを使用する。
    '/': ['/', '!*/contact/.+\.php'],
    '/contact/': ['!*/contact/.+\.php', 'inherit']
  }
});
</pre>

`'rewrite'`キーワードを指定すると`scope.rewrite`に定義した関数によりハッシュテーブルでキーとして走査する遷移元URLを一度だけ書き換えます。このときURLの階層に`'/*/'`を含めるとこの階層に位置する実際のディレクトリに置換して比較が行われます。

<pre class="sh brush: js;">
$.pjax({
　　scope: {
    // `/scope/`ディレクトリ下で直下のディレクトリをまたがないページ遷移のみpjaxを使用する。
    // /scope/foo/fizz/  >>  /scope/foo/buzz/  OK
    // /scope/foo/fizz/  >>  /scope/bar/buzz/  NG
    '/scope/': ['rewrite'],
    '/scope/*/': ['/scope/*/'],
    rewrite: function(key){return key.replace(/^(\/scope\/)\w+/, '$1*');}
  }
});
</pre>
