# PJAX

![CI](https://github.com/falsandtru/pjax-api/workflows/CI/badge.svg)

The advanced PJAX for web services.

The pjax-api provides almost complete original web experience.
Most other SPA frameworks and pjax libraries lack many important functions to keep the original web experience such as follows.

- **Browser history fix (Fix for browsers)**
  - Browsers set the wrong title to the current URL in fast page back/forward.
- **Scroll position restoration (Fix for browsers)**
  - Browsers cannot restore the scroll position if the current content doesn't have sufficient scroll size.
- **Unexpected scroll prevention (Fix for browsers)**
  - Browsers unexpectedly scroll the page before updating the page in page back/forward.
- Scroll behaviors around hash links
  - Most other frameworks and libraries reproduce wrong scroll behaviors.

## Features

|Feature|defunkt|Turbolinks|falsandtru|Barba|
|:------|:-----:|:--------:|:--------:|:---:|
|**Concurrent sequence integration**|-|-|✓|-|
|Shadow DOM support|-|-|✓|-|
|*Multiple area update*|-|✓|✓|-|
|Fallback area matching|-|-|✓|-|
|Content type verification|-|✓|✓|-|
|*HEAD contents markless auto sync*|-|-|✓|-|
|*CSS markless auto sync*|-|-|✓|-|
|*Script markless auto load*|-|-|✓|-|
|External script load|✓|✓|✓|✓|
|Inline script execution|-|✓|✓|✓|
|Execution sequence keeping|-|-|✓|-|
|Non-blocking script load|✓|✓|✓|-|
|**Subresource integrity verification**|-|-|✓<sup>\*1</sup>|-|
|Lightweight source rewrite|-|✓|✓|-|
|ETag support|-|-|✓|-|
|Cache|✓|✓|✓|✓|
|URL scope|-|-|✓|✓|
|URL scope-based override settings|-|-|✓|✓|
|**Browser history fix**|-|-|✓|-|
|**Scroll position restoration**|-|-|✓|-|
|**Unexpected scroll prevention**|-|-|✓|-|
|NOSCRIPT tag restoration|-|-|✓|-|
|History API support<sup>\*2</sup>|-|-|✓|-|
|No jQuery dependency|-|-|✓|✓|

\*1 Excludes ES modules.\
\*2 Ability to use pjax APIs and history APIs in combination.

## Documents

https://falsandtru.github.io/pjax-api

## Install

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

