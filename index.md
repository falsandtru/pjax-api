---
layout: layout
title: PJAX
type: index
class: style-top
---

{::options parse_block_html="true" /}

<div class="row">

<div class="col-md-4">
## Features

**The pjax-api provides almost complete original web experience.**

- Browser history fix
- Scroll position restoration
- Unexpected scroll prevention
- Scroll behaviors around hash links
- Concurrent sequence integration
- [More](https://github.com/falsandtru/pjax-api#features)
</div>

<div class="col-md-4">
## APIs

This site is also powered by PJAX as a demo. Try page transitions.

- [API]({{ site.basepath }}api/)
  - [Pjax]({{ site.basepath }}api/pjax/)
  - [Event]({{ site.basepath }}api/event/)
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
