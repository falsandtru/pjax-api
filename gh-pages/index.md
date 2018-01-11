---
layout: layout
title: PJAX
type: index
class: style-top
---

{::options parse_block_html="true" /}

<div class="row">

<div class="col-md-4">
## Feature

- <a href="{{ site.basepath }}demo/basic/1.html" target="_blank">Basic</a>
	- Multiple area update
	- Fallback area matching
	- CSS markless auto sync
	- Script markless auto load
	- [more](https://github.com/falsandtru/pjax-api#feature)
- Concurrency integration
</div>

<div class="col-md-4">
## Installation

```
$ npm i pjax-api
```

```html
<script src="/js/pjax-api.js"></script>
<script src="/js/config.js"></script>
```

```js
// config.js
var Pjax = require('pjax-api').Pjax;
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
</div>

<div class="col-md-4">
## API

[API]({{ site.basepath }}api/)

- [Pjax]({{ site.basepath }}api/pjax/)
- [Event]({{ site.basepath }}api/event/)
- [Router]({{ site.basepath }}api/router/)
</div>

</div>

<div class="row">

<div class="col-md-4">
## Browser

Requires es6 support.

- Chrome
- Firefox
- Safari
- Edge
</div>

<div class="col-md-4">
## Source

[https://github.com/falsandtru/pjax-api](https://github.com/falsandtru/pjax-api)
</div>

<div class="col-md-4">
</div>

</div>
