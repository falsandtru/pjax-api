---
layout: bootstrap
title: rewrite
type: page
nav: nav
class: style-api style-api-detail
---

# rewrite
ページ遷移に使用するHTMLDocumentをあらかじめ書き換えます。初期値は`null`です。

<a href="{{ site.basepath }}demo/area/" target="_blank" class="btn btn-primary" role="button">demo</a>

## rewrite: function(document, area, host)

<pre class="sh brush: js;">
$.pjax({
  rewrite: function(document, area, host) {
    if (!host) {return;}
    $(area, document).find('img').each(function(){
      this.src = this.src.replace(/\/[^/]+/, '/' + host);
    });
  }
});
</pre>
