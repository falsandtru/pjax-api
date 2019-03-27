# PJAX

[![Build Status](https://travis-ci.org/falsandtru/pjax-api.svg?branch=master)](https://travis-ci.org/falsandtru/pjax-api)

The second generation PJAX for the advanced web frameworks.

## Features

|Feature|defunkt|falsandtru|Turbolinks|
|:------|:-----:|:--------:|:--------:|
|**Concurrency integration**|X|O|X|
|Shadow DOM support|X|O|X|
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
|Subresource integrity checking|X|O<sup>\*1</sup>|X|
|Lightweight source rewrite|X|O|O|
|Cache|O|O|O|
|URL scope|X|O|X|
|URL scope-based override settings|X|O|X|
|**Browser history fix**|**X**|O|**X**|
|**Scroll position restoration**|**X**|O|**X**|
|NOSCRIPT tag restoration|X|O|X|

\*1 Excludes ES modules.

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
