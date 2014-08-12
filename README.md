# PJAX
[![Build Status](https://travis-ci.org/falsandtru/jquery.pjax.js.svg?branch=master)](https://travis-ci.org/falsandtru/jquery.pjax.js)

**[Document](http://falsandtru.github.io/jquery.pjax.js/)**
 | 
**[js](https://github.com/falsandtru/jquery.pjax.js/releases)**
 | 
**[d.ts](src/ts/.d/jquery.pjax.d.ts)**

This pjax has a extremely high flexibility and compatibility.

You will be able most of your want.

## Feature

* Faster by preloading
* Network Load Balancing by CsLB
* Sync the HEAD element, such as CSS, SCRIPT, RSS
* Updated Disabling itemized such as URL, TITLE
* Resolution of common problems of pjax
* etc...

## Usage

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
      this.setAttribute('data-original', this.getAttribute('src'));
      this.setAttribute('src', '/img/gray.gif');
    })//.lazyload();
  },
  // Override setting
  // Enabling control
  scope: {
    search: ['/search/'],
    $search: { form: 'form:not([method])' },
    '/': ['/', '#search', '!/contact/']
  }
});

// 6 events and 43 callbacks exists.
$(document).bind('pjax.ready', function() {
  console.log('ready');
});
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
Please do not use in a production environment the release version (master branch) other than. You may receive an error due to mismatch of the database schema is generated can not update the database.

## License
MIT License
