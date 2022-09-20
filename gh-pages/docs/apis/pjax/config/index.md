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

You can specify the multiple targets like `['#header, #primary']`.
You can also specify the other candidates of targets like `['#container', 'body']`.

## link: string = `':is(a, area)[href]:not([target])'`

Set target links.

## filter: (el: HTMLAnchorElement | HTMLAreaElement) => boolean = ...

Filter target links.

```ts
  // Default
  public filter(el: HTMLAnchorElement | HTMLAreaElement): boolean {
    return true;
  }
```

## form: string = `'form:not([method])'`

Set target forms.

## replace: string = `''`

Set target links that replace the current URL.

## lock: () => string = ...

Give CSS to lock and protect the scroll position from unexpected scrolling caused by a browser bug.

```ts
  // Default
  public readonly lock = () => `
    :root {
      position: fixed;
      top: ${-window.scrollY}px;
      left: ${-window.scrollX}px;
      right: 0;
      ${window.innerWidth - document.body.clientWidth ? 'overflow-y: scroll;' : ''}
      ${window.innerHeight - document.body.clientHeight ? 'overflow-x: scroll;' : ''}
    }`;
```

## fetch: {...} = ...

### rewrite: (path: string) => string = `path => path`

Rewrite URL implicitly.

### cache: (path: string, headers: Headers) => string = `() => ''`

Give the key of the request cache.
If you return the empty string, the current request doesn't make and use the cache.
This option is only enabled with GET method.

### timeout: number = `3000`

Set timeout for request by ms.

### wait: number = `0`

Wait for the specified milliseconds after sending a request.

## update: {...} = ...

### rewrite: (doc: Document, area: string) => void = `() => undefined`

Rewrite the source document object.
If you use the sequence option, you should use only it instead of this.

### head: string = `'base, meta, link'`

Set sync targets in the head element. Only support `base`, `meta`, and `link` tags.

### css: boolean = `true`

Set CSS auto sync.

### script: boolean = `true`

Set script auto load.

External scripts run once per URL.
Inline scripts run every transition.

### ignore: string = `''`

Select ignore targets from head children, CSS, and scripts.
The next internal defaults are also applied.

```ts
  // Default
    ignores: {
      extension: '[href^="chrome-extension://"]',
      security: '[src*=".scr.kaspersky-labs.com/"]',
    },
```

### reload: string = `''`

Select reload targets from scripts.

### logger: string = `''`

Select logging targets from scripts.

## fallback: (target: HTMLAnchorElement | HTMLAreaElement | HTMLFormElement | Window, reason: unknown) => void = ...

Fallback processing.

```ts
  // Default
  public fallback(target: HTMLAnchorElement | HTMLAreaElement | HTMLFormElement | Window, reason: unknown): void {
    if (target instanceof HTMLAnchorElement || target instanceof HTMLAreaElement) {
      return void window.location.assign(target.href);
    }
    if (target instanceof HTMLFormElement) {
      return void window.location.assign(target.action);
    }
    if (target instanceof Window) {
      return void window.location.reload();
    }
    throw reason;
  }
```

## sequence: Sequence<a, b, c, d> = ...

Control the transition sequence.
It integrates and synchronizes other async processes.
All the methods must be defined, not optional.

```ts
const sequence: Sequence<1, 2, 3, 4> = {
  async fetch() {
    return 1;
  },
  async unload() {
    return 2;
  },
  async content() {
    return 3;
  },
  async ready() {
    return 4;
  },
  async load() {
  }
};
```

### fetch: (result: void, request: { path: string; method: string; headers: Headers; body: FormData | null; }): Promise\<a>

### unload: (result: a, response: { url: string; header: (name: string) => string | null; document: Document; }): Promise\<b>

### content: (result: b, areas: HTMLElement[]): Promise\<c>

### ready: (result: c): Promise\<d>

### load: (result: d, events: Event[]): Promise\<void>

## scope: Record<string, Config | undefined> = `{}`

Override the default configs, or disable pjax.
You can use `{}`, `**`, `*`, and `?` metacharacters for path matching.

```ts
new Pjax({
  areas: [
    '#header, #primary',
    '#container',
    'body'
  ],
  scope: {
    '/': undefined, // Disable
    '/posts/': {}, // Enable
    '/posts/*/': {
      replace: '.replace' // Override
    },
    '/{a,b}/': {} // Expand to '/a/' and '/b/'
  }
});
```
