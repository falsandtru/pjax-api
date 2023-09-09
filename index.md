---
layout: layout
title: PJAX - The advanced PJAX superior to SPA.
type: index
class: style-top
---

{::options parse_block_html="true" /}

<div class="row">

<div class="col-md-4">
## Features

The pjax-api provides almost complete original web experience.

- Browser history fix
- Scroll position restoration
- Unexpected scroll prevention
- Scroll behaviors around hash links
- [**SPA on Pjax (Use JSON instead of HTML)**]({{ site.basepath }}docs/modes/#json-spa)
- [More](https://github.com/falsandtru/pjax-api#features)
</div>

<div class="col-md-4">
## Modes

**Adding JSON APIs is the only change required on servers to enable *SPA on Pjax*.**

JSON(SPA) mode is statically and dynamically configurable per URL scope on browsers.

- [None (Offline)]({{ site.basepath }}docs/modes/#none-offline)
  - Send no requests.
- [HTML (Pjax)]({{ site.basepath }}docs/modes/#html-pjax)
  - Request an HTML response.
- [JSON (SPA)]({{ site.basepath }}docs/modes/#json-spa)
  - Request a JSON response.
- Any
  - Any response types are available in the same way as JSON.
- [More](https://github.com/falsandtru/pjax-api#properties)
</div>

<div class="col-md-4">
## Usage

```html
<script src="https://cdn.jsdelivr.net/npm/pjax-api@latest"></script>
<script src="/assets/js/config.js"></script>
```

```js
// config.js
import Pjax from 'pjax-api';
// or
const { Pjax } = window['pjax-api'];

new Pjax({
  areas: [
    // Try the first query.
    '#header, #primary',
    // Retry using the second query
    // if the first query doesn't match.
    '#container',
    // Retry.
    'body'
  ]
});
```
</div>

</div>

<div class="row">

<div class="col-md-4">
## Documents

This site is also powered by PJAX as a demo. Try page transitions.

- [APIs]({{ site.basepath }}docs/apis/)
  - [Pjax]({{ site.basepath }}docs/apis/pjax/)
    - [Config]({{ site.basepath }}docs/apis/pjax/config/)
  - [Events]({{ site.basepath }}docs/apis/events/)
  - [Util]({{ site.basepath }}docs/apis/util/)
- [Modes]({{ site.basepath }}docs/modes/)
</div>

<div class="col-md-4">
## Browsers

- Chrome
- Firefox
- Safari
- Edge (Chromium edition only)
</div>

<div class="col-md-4">
## Source

[https://github.com/falsandtru/pjax-api](https://github.com/falsandtru/pjax-api)
</div>

<div class="col-md-4">
</div>

</div>
