# PJAX

[![Build Status](https://travis-ci.org/falsandtru/pjax-api.svg?branch=master)](https://travis-ci.org/falsandtru/pjax-api)
[![Coverage Status](https://coveralls.io/repos/falsandtru/pjax-api/badge.svg?branch=master&service=github)](https://coveralls.io/github/falsandtru/pjax-api?branch=master)
[![Dependency Status](https://gemnasium.com/falsandtru/pjax-api.svg)](https://gemnasium.com/falsandtru/pjax-api)

The second generation PJAX for the advanced web frameworks.

## Features

|Feature|defunkt|falsandtru|Turbolinks|
|:------|:-----:|:--------:|:--------:|
|**Concurrency integration**|X|O|X|
|Multiple area update|X|O|O|
|Fallback area matching|X|O|X|
|Content type validation|X|O|O|
|HEAD contents markless auto sync|X|O|X|
|CSS markless auto sync|X|O|X|
|Script markless auto load|X|O|X|
|External script load|O|O|O|
|Inline script execution|X|O|O|
|Execution sequence keeping|X|O|X|
|Non-blocking script load|O|O|O|
|Lightweight source rewrite|X|O|O|
|Cache|O|X|O|
|URL scope|X|O|X|
|URL scope-based override settings|X|O|X|
|**Browser history fix**|**X**|O|**X**|
|**Scroll position restoration**|**X**|O|**X**|
|NOSCRIPT tag restoration|X|O|X|

## Documents, APIs, and Demos

[pjax-api](http://falsandtru.github.io/pjax-api)

## Usage

```html
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

## Browsers

Requires es6 and modern DOM API support.

- Chrome
- Firefox
- Safari
- Edge

Polyfill: https://cdn.polyfill.io
