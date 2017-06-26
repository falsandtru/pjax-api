# PJAX

[![Build Status](https://travis-ci.org/falsandtru/pjax-api.svg?branch=master)](https://travis-ci.org/falsandtru/pjax-api)
[![Coverage Status](https://coveralls.io/repos/falsandtru/pjax-api/badge.svg?branch=master&service=github)](https://coveralls.io/github/falsandtru/pjax-api?branch=master)
[![Dependency Status](https://gemnasium.com/falsandtru/pjax-api.svg)](https://gemnasium.com/falsandtru/pjax-api)

The second generation PJAX for the advanced web frameworks.

## Feature

|Feature|defunkt|falsandtru|Turbolinks|
|:------|:-----:|:--------:|:--------:|
|**Concurrency integration**|X|O|X|
|**Client side load balancing**|X| |X|
|Multiple area update|X|O|O|
|Fallback area matching|X|O|X|
|Content type validation|X|O|O|
|HEAD contents markless auto sync|X|O|X|
|CSS markless auto sync|X|O|X|
|Script markless auto load|X|O|X|
|External script load|O|O|O|
|Inline script execution|X|O|O|
|Keep execution sequence|X|O|X|
|Non-blocking script load|O|O|O|
|Lightweight source rewrite|X|O|O|
|Caching|O|X|O|
|URL scope|X|O|X|
|URL scope base ovarride setting|X|O|X|
|**Browser history fix**|**X**|O|**X**|
|**Scroll position restoration**|**X**|O|**X**|
|NOSCRIPT tag restoration|X|O|X|

## Demo

- [Basic](http://falsandtru.github.io/pjax-api/demo/basic/1.html)

## Usage

```html
<script src="/js/spica.js"></script>
<script src="/js/pjax-api.js"></script>
```

```ts
import Pjax from 'pjax-api';

new Pjax({
  areas: [
    // try to use the first query.
    '#header, #primary',
    // fallback, retrying with the second query.
    '#container',
    // fallback.
    'body'
  ]
});
```

- [spica](https://github.com/falsandtru/spica)

## Document

[pjax-api](http://falsandtru.github.io/pjax-api)

## Browser

Requires es6 support.

- Chrome
- Firefox
- Safari
- Edge
