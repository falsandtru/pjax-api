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

## #assign(url: string): undefined

Go to url.

```ts
new Pjax({}).assign('/');
```

## #replace(url: string): undefined

Go to url with replacing.

```ts
new Pjax({}).replace('/');
```

## .assign(url: string, config: Config): undefined

Go to url.

```ts
Pjax.assign('/', {});
```

## .replace(url: string, config: Config): undefined

Go to url with replacing.

```ts
Pjax.replace('/', {});
```
