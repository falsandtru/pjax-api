# PJAX

![CI](https://github.com/falsandtru/pjax-api/workflows/CI/badge.svg)

The advanced PJAX superior to SPA.

The pjax-api can implement SPA on Pjax less expensive than SPA frameworks.
And provides almost complete original web experience.
Most SPA frameworks and pjax libraries lack many essential functions to keep the original web experience such as follows.

- **Browser history fix (Fix for browsers)**
  - Browsers set the wrong title to the current URL in page back/forward.
- **Scroll position restoration (Fix for browsers)**
  - Browsers cannot restore the scroll position if the current content doesn't have sufficient scroll size.
- **Unexpected scroll prevention (Fix for browsers)**
  - Browsers unexpectedly scroll the page before updating the page in page back/forward.
- Scroll behaviors around hash links
  - Most frameworks and libraries reproduce wrong scroll behaviors around hash links.
- Scroll position after reloading
  - Most frameworks break the current scroll position after reloading.

## Properties

Pjax is a low-level API for SPA easier, simpler, and less expensive than high-level APIs of SPA frameworks.

```ts
// SPA on Pjax
import Pjax, { FakeXMLHttpRequest } from 'pjax-api';

new Pjax({
  fetch: {
    rewrite: url =>
      FakeXMLHttpRequest.create(
        url,
        fetch(url, { headers: { 'Content-Type': 'application/json' } })
          .then(res => res.json())
          .then(data =>
            new DOMParser().parseFromString(
              `<title>${data.title}</title><body>${data.body}</body>`,
              'text/html'))),
  },
});
```

||SPA on frameworks<sup>\*1</sup>|SPA on Pjax|
|:-----|:---------------:|:---------:|
|Type|Framework|Library|
|Abstraction level|High|Low|
|Original template language|Yes|**No**|
|Intermediate layer|Yes|**No**|
|Data format|JSON|JSON or anything<sup>\*2</sup>|
|UX integrity<sup>\*3</sup>|Low|**High**|
|Technical property|**Exclusive**|Coexistence|
|Ecosystem|**Dedicated**|Common|
|Old servers|**Dispose**|**Keep**|
|New servers|Required|Optional|
|Work on servers|**Redevelop all**|Add JSON APIs<sup>\*4</sup>|
|Work on clients|**Redevelop all**|Reconstruct scripts<sup>\*5</sup>|
|Partial introduction|Coarse|Fine|
|Location|Servers and Clients|Clients|
|Server constraints|Strong|**Nothing**|
|Dependence|High|Low|
|Learning costs|High|Low|
|Development costs|High|Low|
|Operation costs|High|Low|
|Running costs|High|Low|
|Removal costs|High|Low|
|Renewal costs|High|Low|

<small>*1 Such as React.</small><br>
<small>*2 You can send any efficient format instead of JSON and parse it on clients.</small><br>
<small>*3 Between MPA(standard web sites) and SPA.</small><br>
<small>*4 Just do it.</small><br>
<small>*5 To manage the lifetime of existing scripts. Since such management doesn't depend on SPA, these scripts are sharable and reusable with MPA and other SPA libraries.</small><br>

*SPA frameworks are cancer of the web.*

## Features

|Feature|defunkt|Turbolinks|falsandtru|Barba|
|:------|:-----:|:--------:|:--------:|:---:|
|**SPA on Pjax (Use JSON instead of HTML)**| | |✓| |
|*Multiple area update*| |✓|✓| |
|Fallback area matching| | |✓| |
|Shadow DOM support| | |✓| |
|Content type verification| |✓|✓| |
|*HEAD contents markless auto sync*| | |✓| |
|*CSS markless auto sync*| | |✓| |
|*Script markless auto load*| | |✓| |
|External script load|✓|✓|✓|✓|
|Inline script execution|✓|✓|✓|✓|
|Execution sequence keeping| | |✓| |
|Non-blocking script load|✓|✓|✓| |
|**Subresource integrity verification**| | |✓<sup>\*1</sup>| |
|**Rewrite request and response (XHR)**| | |✓| |
|Rewrite source document| |✓|✓| |
|Concurrent sequence integration| | |✓| |
|URL scope| | |✓|✓|
|**Browser history fix**| | |✓| |
|**Scroll position restoration**| | |✓| |
|**Unexpected scroll prevention**| | |✓| |
|NOSCRIPT tag fix| | |✓| |
|History API support<sup>\*2</sup>| | |✓| |
|No jQuery dependency| | |✓|✓|

<small>*1 Excludes ES modules.</small><br>
<small>*2 Ability to use pjax APIs and history APIs in combination.</small><br>

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

