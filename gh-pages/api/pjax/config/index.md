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

## link: string = `'a:not([target])'`

Set target anchor links.

## filter: (el: HTMLAnchorElement) => boolean = ...

Filter target anchor links.

```ts
  // default
  public filter(el: HTMLAnchorElement): boolean {
    if (typeof el.href !== 'string') return false;
    return /^https?:$/.test(new URL(el.href).protocol);
  }
```

## form: string = `'form:not([method])'`

Set target forms.

## replace: string = `''`

Set target anchor links that will replace a current url.

## fetch: {...} = ...

### timeout: number = `3000`

Set timeout for request by ms.

### wait: number = `0`

Wait specified milliseconds after sending a request.

## rewrite: (doc: Document, area: string, host: string) => void = ...

Rewrite a source document object.

```ts
  // default
  public rewrite(doc: Document, area: string, host: string): void {
  }
```

## update: {...} = ...

### head: string = `'base, meta, link'`

Set sync targets in head element. Only support `base`, `meta` and `link` tags.

### css: boolean = `true`

Switch css auto sync.

### script: boolean = `true`

Switch script auto load.

External scripts will be run once per url.
Inline scripts will be run everytime.

### ignore: string = `'[href^="chrome-extension://"], [src*=".scr.kaspersky-labs.com/"]'`

Set ignore targets for head, css and script.

### reload: string = `''`

Set reload targets for script.

### logger: string = `''`

Set logging targets for script.

## fallback: (target: HTMLAnchorElement | HTMLFormElement | Window, reason: any) => void = ...

Override a fallback processing.

```ts
  // default
  public fallback(target: HTMLAnchorElement | HTMLFormElement | Window, reason: any): void {
    if (target instanceof HTMLAnchorElement) {
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

## sequence: Sequence<a, b, c> = ...

Control the page routing sequence.
It can integrate and synchronize other async processes.

### fetch: (result: void, request: { host: string; path: string; method: string; data: FormData | null; }): Promise<a>

### unload: (result: a, response: { url: string; headers: { [field: string]: string; }; document: Document; }): Promise<b>

### ready: (result: b, areas: HTMLElement[]): Promise<c>

### load: (result: c, events: Event[]): void

## store: {...} = ...

### expiry: number = `3 * 3600 * 1e3`

Set an expiry of records.

## scope: { [path: string]: Config | undefined } = `{ '/': {} }`

Override default configs by merging, or disable pjax per path of url.
It can use `*`, `?` and `{a,b}` patterns like glob with path string. 

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
