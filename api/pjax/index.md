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
