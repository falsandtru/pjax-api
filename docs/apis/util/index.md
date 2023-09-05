---
layout: layout
title: Util
type: page
nav: nav
class: style-api style-api-detail
---

# Util

## FakeXMLHttpRequest

Make a fake XHR object that doesn't send a request.

```ts
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
