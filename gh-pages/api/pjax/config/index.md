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

## link: string = `'a'`

Set target anchor links.

## filter: (el: HTMLAnchorElement) => boolean = ...

Filter target anchor links.

```ts
  // default
  public filter(el: HTMLAnchorElement): boolean {
    return el.matches(':not([target])');
  }
```

## form: string = `'form:not([method])'`

Set target forms.

## replace: string = `''`

Set target anchor links that will replace a current url.

## redirect: (path: string) => string = ...

Redirect a page request implicitly.

```ts
  // default
  public redirect(path: string): string {
    return path;
  }
```

## fetch: {...} = ...

### timeout: number = `3000`

Set timeout for request by ms.

### wait: number = `0`

Wait specified milliseconds after sending a request.

## rewrite: (doc: Document, area: string) => void = ...

Rewrite a source document object.
If you use the sequence option, you should use only it instead of this.

```ts
  // default
  public rewrite(doc: Document, area: string): void {
  }
```

## update: {...} = ...

### head: string = `'base, meta, link'`

Set sync targets in head element. Only support `base`, `meta`, and `link` tags.

### css: boolean = `true`

Switch css auto sync.

### script: boolean = `true`

Switch script auto load.

External scripts will be run once per url.
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

Override default configs without `link`, `filter`, `form`, and `replace` by merging, or disable pjax per path of url.
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
