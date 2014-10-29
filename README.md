# PJAX

**[Document](http://falsandtru.github.io/jquery-pjax/)**
|
**[js](https://github.com/falsandtru/jquery-pjax/releases)**
|
**[d.ts](src/ts/.d/jquery.pjax.d.ts)**

[![Build Status](https://travis-ci.org/falsandtru/jquery-pjax.svg?branch=master)](https://travis-ci.org/falsandtru/jquery-pjax)
[![Dependency Status](https://gemnasium.com/falsandtru/jquery-pjax.svg)](https://gemnasium.com/falsandtru/jquery-pjax)

This pjax has a extremely high flexibility and compatibility.

You will be able most of your want.

## Feature

* Faster by preloading
* Network Load Balancing by CsLB
* Sync the HEAD element, such as CSS, SCRIPT, RSS
* Disabling update itemes such as URL, TITLE
* Resolution of pjax common problems
* etc...

## Usage

### pjax

```javascript
// Major feature activation
$.pjax({
  // Multiple area update
  // Fallback area matching
  area: [
    '#header, #primary, #secondary',
    '#container',
    'body'
  ],
  // Sync and load
  load: {
    head: 'base, meta, link',
    css: true,
    script: true
  },
  // On memory cache
  cache: {
    click: true, submit: true, popstate: true,
    get: true, post: false
  },
  // Rewrite source document
  rewrite: function(document, area) {
    $(area, document).find('img').each(function(){
      this.setAttribute('data-original', this.src);
      this.setAttribute('src', '/img/gray.gif');
    }).addClass('delay');
  },
  // Override setting
  // Enabling control
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
```

### preload

```javascript
// console
// [-310, 1, 361, 379, 403, 424, 450, 486, 487, 491]
// ["preload(-310)", "continue(1)", "load(361)", "parse(379)", "head(403)", "content(424)", "css(450)", "script(486)", "renderd(487)", "defer(491)"]

if (!/touch|tablet|mobile|phone|android|iphone|ipad|blackberry/i.test(window.navigator.userAgent)) {
  $.preload({
    forward: $.pjax.follow,
    check: $.pjax.getCache,
    encode: true,
    ajax: {
      done: function ( data, textStatus, XMLHttpRequest ) {
        !$.pjax.getCache( this.url ) && $.pjax.setCache( this.url, null, textStatus, XMLHttpRequest );
      }
    }
  });

  $.pjax({
    area: 'body',
    load: { head: 'base, meta, link', css: true, script: true },
    cache: { click: true, submit: false, popstate: true },
    speedcheck: true
  });

  $(document).bind('pjax:ready', function() {
    setTimeout(function () {
      $(document).trigger('preload');
    }, 2000);
  });
}
```

## API
Sorry, there are only Japanese documents. I welcome translation.

## Browser
Support major browsers.

* IE10+
* Chrome
* Firefox
* Safari
* Opera
* Android
* iOS

## jQuery
jQuery1.6+ Recommended.

* v1.4.2
* v1.7.2
* v1.11.1
* v2.1.1

## Caution
Please do not use the non-release version in a production environment. Error may be caused by inconsistencies in the database schema.

## License
MIT License
