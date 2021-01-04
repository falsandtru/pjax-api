# PJAX

![CI](https://github.com/falsandtru/pjax-api/workflows/CI/badge.svg)

The second generation PJAX for advanced web frameworks.

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
|ETag support|X|O|X|
|Cache|O|O|O|
|URL scope|X|O|X|
|URL scope-based override settings|X|O|X|
|**Browser history fix**|**X**|O|**X**|
|**Scroll position restoration**|**X**|O|**X**|
|NOSCRIPT tag restoration|X|O|X|
|History API support<sup>\*2</sup>|?|O|?|
|No jQuery dependency|X|O|?|

\*1 Excludes ES modules.\
\*2 You can use pjax APIs and history APIs in combination.

## Documents, APIs, and Demos

https://falsandtru.github.io/pjax-api

## Get

### CDN

https://www.jsdelivr.com/package/npm/pjax-api

### npm

```
$ npm i pjax-api
```

## Usage

Note that this example specifies the latest version. You have to replace it with any specific version to preserve APIs from breaking changes.

```html
<script src="https://cdn.jsdelivr.net/npm/pjax-api@latest"></script>
<script src="/assets/js/config.js"></script>
```

```ts
// config.js
import Pjax from 'pjax-api';
// or
const { Pjax } = require('pjax-api');

new Pjax({
  areas: [
    // Try the first query.
    '#header, #primary',
    // Retry with the second query when the first query doesn't match.
    '#container',
    // Retry.
    'body'
  ]
});
```

## Browsers

- Chrome
- Firefox
- Safari
- Edge (Chromium edition only)

