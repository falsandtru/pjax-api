---
layout: layout
title: Pjax Config
type: page
nav: nav
class: style-api style-api-detail
---

# Pjax Config

## areas: string[] = `['body']`

Target areas.

Multiple areas can be specified as `['#header, #primary']`.
Multiple candidates can be specified as `['#container', 'body']`.

## link: string = `':is(a, area)[href]:not([target])'`

Target links.

## filter: (el: HTMLAnchorElement | HTMLAreaElement) => boolean = ...

Filter target links.

```ts
  // Default
  public filter(el: HTMLAnchorElement | HTMLAreaElement): boolean {
    return true;
  }
```

## form: string = `'form:not([method])'`

Target forms.

## replace: string = `''`

Target links that replace the current URL.

## memory?: Dict<string, Document>

Dictionary or cache object having has/get/set/delete methods of Map to pass the document object matching the URL to the rewrite functions.

## fetch: {...} = ...

### rewrite?: (url: string, method: string, headers: Headers, timeout: number, body: FormData | null, memory?: Document) => XMLHttpRequest | undefined

Rewrite the XHR object, or replace it with another or fake.

### timeout: number = `3000`

Timeout value of requests by ms.

### wait: number = `0`

Minimum time by ms required for requests.

## update: {...} = ...

### rewrite?: (url: string, document: Document, area: string, memory?: Document) => void

Rewrite the source document object.
If you use the sequence option, you should use only it instead of this.

### head: string = `'base, meta, link'`

Sync targets in the head element. Only support `base`, `meta`, and `link` tags.

### css: boolean = `true`

CSS auto sync.

### script: boolean = `true`

Script auto load.

External scripts run once per their source URL.
Inline scripts run every transition.

### ignore: string = `''`

Ignore targets from head children, CSS, and scripts.
The next internal defaults are also applied.

```ts
  // Default
    ignores: {
      extension: '[href^="chrome-extension://"]',
      security: '[src*=".scr.kaspersky-labs.com/"]',
    },
```

### reload: string = `''`

Reload targets of scripts.

### log: string = `''`

Log targets of scripts.

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
`{}`, `**`, `*`, and `?` metacharacters are available for path matching.

```ts
new Pjax({
  areas: [
    '#container',
    'body'
  ],
  scope: {
    '/': {}, // Enable.
    '/form': undefined, // Disable.
    '/posts': {
      replace: '.replace' // Override.
    },
    '/search': { isolation: true }, // Disable inter-scope transitions.
    '/{a,b}/': {} // Expand to '/a/' and '/b/'.
  }
});
```

## isolation: boolean = `false`

Disable inter-scope transitions.
