---
layout: layout
title: Pjax Config
type: page
nav: nav
class: style-api style-api-detail
---

# Pjax Config

## areas: string[] = `['body']`

Set target areas.

You can define the multiple targets like `['#header, #primary']`.
Also, you can define the other candidates of targets like `['#container', 'body']`.

## link: string = `'a, area'`

Set target links.

## filter: (el: HTMLAnchorElement | HTMLAreaElement) => boolean = ...

Filter target links.

```ts
  // default
  public filter(el: HTMLAnchorElement | HTMLAreaElement): boolean {
    return el.matches('[href]:not([target])');
  }
```

## form: string = `'form:not([method])'`

Set target forms.

## replace: string = `''`

Set target links that will replace the current URL.

## fetch: {...} = ...

### rewrite: (path: string) => string = `path => path`

Rewrite URL implicitly.

### cache: (path: string, headers: Headers) => string = `() => ''`

Give a key of the request cache.
If you return empty string, the current request won't use or make the cache.
This option is only enabled with GET method.
Note that from caches with shared keys you can't get the actual URLs redirected on servers.

### timeout: number = `3000`

Set timeout for request by ms.

### wait: number = `0`

Wait specified milliseconds after sending a request.

## update: {...} = ...

### rewrite: (doc: Document, area: string) => void = `() => undefined`

Rewrite a source document object.
If you use the sequence option, you should use only it instead of this.

### head: string = `'base, meta, link'`

Set sync targets in head element. Only support `base`, `meta`, and `link` tags.

### css: boolean = `true`

Switch css auto sync.

### script: boolean = `true`

Switch script auto load.

External scripts will be run once per URL.
Inline scripts will be run everytime.

### ignore: string = `''`

Set ignore targets for head, css and script.
Another, the following internal defaults will also be applied.

```ts
({
  extension: '[href^="chrome-extension://"]',
  security: '[src*=".scr.kaspersky-labs.com/"]',
})
```

### reload: string = `''`

Set reload targets for script.

### logger: string = `''`

Set logging targets for script.

## fallback: (target: HTMLAnchorElement | HTMLAreaElement | HTMLFormElement | Window, reason: any) => void = ...

Override a fallback processing.

```ts
  // default
  public fallback(target: HTMLAnchorElement | HTMLAreaElement | HTMLFormElement | Window, reason: any): void {
    if (target instanceof HTMLAnchorElement || target instanceof HTMLAreaElement) {
      return void window.location.assign(target.href);
    }
    if (target instanceof HTMLFormElement) {
      return void window.location.assign(target.action);
    }
    if (target instanceof Window) {
      return void window.location.reload(true);
    }
    throw reason;
  }
```

## sequence: Sequence<a, b, c, d> = ...

Control the page routing sequence.
It can integrate and synchronize other async processes.
All methods are required, not optional.

### fetch: (result: void, request: { path: string; method: string; headers: Headers; body: FormData | null; }): Promise\<a>

### unload: (result: a, response: { url: string; header: (name: string) => string | null; document: Document; }): Promise\<b>

### content: (result: b, areas: HTMLElement[]): Promise\<c>

### ready: (result: c): Promise\<d>

### load: (result: d, events: Event[]): Promise\<void>

## scope: Record<string, Config | undefined> = `{}`

Override default configs without `link`, `filter`, `form`, and `replace` by merging, or disable pjax per path of URL.
You can use `{}`, `*`, and `?` metacharacters for path matching.

```ts
new Pjax({
  areas: [
    '#header, #primary',
    '#container',
    'body'
  ],
  scope: {
    '/': undefined, // disable
    '/posts/': {}, // enable
    '/posts/*/': {
      replace: '.replace' // override
    },
    '/{a,b}/': {} // expand to '/a/' and '/b/'
  }
});
```
