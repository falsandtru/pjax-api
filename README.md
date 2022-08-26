# PJAX

![CI](https://github.com/falsandtru/pjax-api/workflows/CI/badge.svg)

The second generation PJAX for advanced web frameworks.

## Features

|Feature|defunkt|falsandtru|Turbolinks|
|:------|:-----:|:--------:|:--------:|
|**Concurrency integration**|-|O|-|
|Shadow DOM support|-|O|-|
|Multiple area update|-|O|O|
|Fallback area matching|-|O|-|
|Content type validation|-|O|O|
|HEAD contents markless auto sync|-|O|-|
|CSS markless auto sync|-|O|-|
|Script markless auto load|-|O|-|
|External script load|O|O|O|
|Inline script execution|-|O|O|
|Execution sequence keeping|-|O|-|
|Non-blocking script load|O|O|O|
|Subresource integrity verification|-|O<sup>\*1</sup>|-|
|Lightweight source rewrite|-|O|O|
|ETag support|-|O|-|
|Cache|O|O|O|
|URL scope|-|O|-|
|URL scope-based override settings|-|O|-|
|**Browser history fix**|**-**|O|**-**|
|**Scroll position restoration**|**-**|O|**-**|
|NOSCRIPT tag restoration|-|O|-|
|History API support<sup>\*2</sup>|?|O|?|
|No jQuery dependency|-|O|?|

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
const { Pjax } = window['pjax-api'];

new Pjax({
  areas: [
    // Try the first query.
    '#header, #primary',
    // Retry using the second query if the first query doesn't match.
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

