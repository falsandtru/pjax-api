---
layout: layout
title: Modes
type: page
nav: nav
class: style-api
---

# Modes

## None (Offline)

Send no requests.

```ts
import Pjax, { FakeXMLHttpRequest } from 'pjax-api';

new Pjax({
  fetch: {
    rewrite: url =>
      FakeXMLHttpRequest.create(
        url,
        new DOMParser().parseFromString(
          `<title>Title</title><body>Body</body>`,
          'text/html')),
  },
});
```

## HTML (Pjax)

Request an HTML response.

```ts
import Pjax, { FakeXMLHttpRequest } from 'pjax-api';

new Pjax({
  fetch: {
    rewrite: url =>
      FakeXMLHttpRequest.create(
        url,
        fetch(url)
          .then(res => res.text())
          .then(html =>
            new DOMParser().parseFromString(
              html,
              'text/html'))),
  },
});
```

## JSON (SPA)

Request a JSON response.

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
