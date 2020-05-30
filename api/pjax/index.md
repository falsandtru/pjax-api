---
layout: layout
title: Pjax
type: page
nav: nav
class: style-api style-api-detail
---

# Pjax

## Typings

<a href="https://github.com/falsandtru/pjax-api/blob/master/pjax-api.d.ts" target="_blank">pjax-api.d.ts</a>

## new Pjax(config: Config): Pjax

Use pjax.

```ts
import Pjax from 'pjax-api';

new Pjax({
  areas: [
    '#header, #primary',
    '#container',
    'body'
  ]
});
```

## Config

[Config]({{ site.basepath }}api/pjax/config/)

## #assign(url: string): boolean

Go to URL.

The return type means the request is accepted or not. In other words, in progress or not.
The same shall apply hereinafter.

```ts
new Pjax({}).assign('/');
```

## #replace(url: string): boolean

Go to URL with replacing.

```ts
new Pjax({}).replace('/');
```

## .assign(url: string, config: Config): boolean

Go to URL.

```ts
Pjax.assign('/', {});
```

## .replace(url: string, config: Config): boolean

Go to URL with replacing.

```ts
Pjax.replace('/', {});
```

## .sync(isPjaxPage?: boolean): void

Cancel the current page transition and sync the internal status.

You **MUST** call Pjax.sync after calling history.pushState and history.replaceState.

```ts
history.pushState(null, 'title', '/path');
Pjax.sync();
```

```ts
history.replaceState(null, 'title', '/path');
Pjax.sync(true);
```

## .pushURL(url: string, title: string, state: any = null): void

The alias of history.pushState and Pjax.sync.

```ts
Pjax.pushURL('/path', 'title');
```

## .replaceURL(url: string, title: string, state: any = history.state): void

The alias of history.replaceState and Pjax.sync.

```ts
Pjax.replaceURL('/path', 'title');
```
