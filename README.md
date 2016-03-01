# PJAX

**[Document](http://falsandtru.github.io/jquery-pjax/)**
|
**[js](https://github.com/falsandtru/jquery-pjax/releases)**
|
**[d.ts](src/ts/.d/jquery.pjax.d.ts)**

[![Build Status](https://travis-ci.org/falsandtru/jquery-pjax.svg?branch=master)](https://travis-ci.org/falsandtru/jquery-pjax)
[![Dependency Status](https://gemnasium.com/falsandtru/jquery-pjax.svg)](https://gemnasium.com/falsandtru/jquery-pjax)

PJAX for the next generation web framework.

## What is the next generation web framework?

### Client(Browser) as an application server

Delegate almost application logics from server to client browser.
Role of servers is only the database access and http(s) request processing.

You can realize the multiple page application using this pjax and data binding.
Let's throw away the single page application.

### Client(Browser) as an infrastructure

Infrastructured browser by client side load balancer and movement of application logics.
This is a further advanced definition.

This pjax realized the browser base client side load balancer.

## Feature & Comparison

Pickup some features.

|Feature|defunkt|falsandtru|Turbolinks|
|:------|:-----:|:--------:|:--------:|
|jQuery|1.8.x|1.4.2|-|
|**Preloading**|X|O|X|
|**Data binding assist**|X|O|X|
|**Lightweight source rewrite**|X|O|O|
|**Client side load balancing**|X|O|X|
|**Wrong histories fixing**|**X**|O|**X**|
|**Scroll position restoration**|**X**|O|**X**|
|**NOSCRIPT tags reparation**|**X**|O|**X**|
|**Relational path complement**|**X**|O|**X**|
|Multiple area update|X|O|O|
|Fallback area matching|X|O|X|
|Content type detection|X|O|O|
|Markless script auto loading|X|O|X|
|External script loading|O|O|O|
|Inline script execution|X|O|O|
|Keep execution sequence|X|O|X|
|Non-blocking script loading|O|O|O|
|Markless CSS auto sync|X|O|X|
|CSS sync|X|O|O|
|Markless HEAD contents auto sync|X|O|X|
|HEAD contents sync|X|O|X|
|Cache creation timing|leave|enter + any time|enter + any time|
|Cache disabling|X|O|O|
|URL scope|X|O|X|
|URL scope base ovarride setting|X|O|X|
|history.state free|X|O|X|
|Cancelable modular update|X|O|X|
|Custom function execute style|event|callback + event|event|
|Custom function execute points|9|31 + 6|7|

## Demo

### <a href="http://falsandtru.github.io/jquery-pjax/demo/falsandtru/" target="_blank">Basic feature</a>

### <a href="http://falsandtru.github.io/jquery-pjax/demo/balance/" target="_blank">Client-side Load Balancer</a>

### <a href="http://falsandtru.github.io/jquery-pjax/demo/bypass/" target="_blank">Bypass server</a>

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
  // Rewrite source document without rendering
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
      success: function ( data, textStatus, XMLHttpRequest ) {
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

### Setting

Name|Type|Description
----|----|-----------
[area](http://falsandtru.github.io/jquery-pjax/api/core/setting/area/)|string/array|Update the area specified by jQuery selector.
[state](http://falsandtru.github.io/jquery-pjax/api/core/setting/state/)|any|Setting the `window.history.state`.
[ajax](http://falsandtru.github.io/jquery-pjax/api/core/setting/ajax/)|ajaxSettings|Ajax settings without callbacks.
[bind](http://falsandtru.github.io/jquery-pjax/api/core/setting/bind/)|function|Request the binding data.
[rewrite](http://falsandtru.github.io/jquery-pjax/api/core/setting/rewrite/)|function|Rewrite the source document object in advance.
[load](http://falsandtru.github.io/jquery-pjax/api/core/setting/load/)|object|Load and sync CSS, SCRIPT and more head content.
[cache](http://falsandtru.github.io/jquery-pjax/api/core/setting/cache/)|object|Cache the page data.
[more...](http://falsandtru.github.io/jquery-pjax/api/core/)||

### Method

Name|Parameter|Return
----|---------|------
[enable()](http://falsandtru.github.io/jquery-pjax/api/method/enable/)|-|this
[disable()](http://falsandtru.github.io/jquery-pjax/api/method/disable/)|-|this
[click()](http://falsandtru.github.io/jquery-pjax/api/method/click/)|-<br>Anchor: element/jQuery<br>Url: string [, Attributes: json ]|this
[submit()](http://falsandtru.github.io/jquery-pjax/api/method/submit/)|-<br>Form: element/jQuery<br>Url: string, Attributes: json, Data: json/array|this
[follow()](http://falsandtru.github.io/jquery-pjax/api/method/follow/)|Event: event, Ajax: jQueryXHR [, Host: string ]|boolean
[more...](http://falsandtru.github.io/jquery-pjax/api/method/)||

### Event

Type|Context|Parameter|Data
----|-------|---------|----
pjax:fetch|document|event|undefined
pjax:unload|window|event|undefined
pjax:DOMContentLoaded|document|event|undefined
pjax:ready|document|event|undefined
pjax:render|document|event|undefined
pjax:load|window|event|undefined
[detail](http://falsandtru.github.io/jquery-pjax/api/event/)|||

### Callback

Path|Context|Parameter|Cancelable
-----|-------|---------|:--------:
ajax.xhr|ajaxSettings|event, pjaxSettings|X
ajax.beforeSend|ajaxSettings|event, pjaxSettings, data, ajaxSettings|X
ajax.dataFilter|ajaxSettings|event, pjaxSettings, data, dataType|X
ajax.success|ajaxSettings|event, pjaxSettings, data, textStatus, jqXHR|X
ajax.error|ajaxSettings|event, pjaxSettings, jqXHR, textStatus, errorThrown|X
ajax.complete|ajaxSettings|event, pjaxSettings, jqXHR, textStatus|X
...|||
update.url.before/after|pjaxSettings|event, pjaxSettings, origLocation, destLocation|O
update.title.before/after|pjaxSettings|event, pjaxSettings, srcTitle, dstTitle|O
update.head.before/after|pjaxSettings|event, pjaxSettings, srcHead, dstHead|O
update.content.before/after|pjaxSettings|event, pjaxSettings, srcContent, dstContent|O
update.css.before/after|pjaxSettings|event, pjaxSettings, srcCSS, dstCSS|O
[more...](http://falsandtru.github.io/jquery-pjax/api/callback/)|||

### Language

Sorry, there are only Japanese documents. I welcome translation.

## Browser
Support major browsers.

* IE11+
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
* v1.11.3
* v2.1.4

## Caution
Please do not use the non-release version in a production environment. Error may be caused by inconsistencies in the database schema.

## License
MIT License
