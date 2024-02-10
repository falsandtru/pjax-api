# Changelog

## 3.43.0

- Refine scope option.
- Add `isolation` option.
- Extend `fetch.rewrite` option to add cache parameter.
- Change `X-Pjax` header value to JSON string of `areas` option.

## 3.42.0

- Enhance `link` option to be strict.

## 3.41.1

- Fix dependencies.

## 3.41.0

- Remove `lock` option.

## 3.40.5

- Micro refactoring.

## 3.40.4

- Fix FakeXMLHttpRequest.

## 3.40.3

- Fix FakeXMLHttpRequest.

## 3.40.2

- Fix URL processing.

## 3.40.1

- Fix error handling.

## 3.40.0

- Add FakeXMLHttpRequest.
- Change `fetch.rewrite` option.
- Change `update.rewrite` option.

## 3.39.1

- Fix noscript parsing.

## 3.39.0

- Refine `fetch.rewrite` option.

## 3.38.5

- Fix URL processing.

## 3.38.4

- Fix percent-encoding.

## 3.38.3

- Update dependencies.

## 3.38.2

- Update dependencies.

## 3.38.1

- Micro refactoring.

## 3.38.0

- Add `cache` option.
- Remove `fetch.cache` option.
- Fix event sequence.

## 3.37.1

- Fix memory processing.

## 3.37.0

- Add `memory` option.
- Refine `update.rewrite` option.

## 3.36.1

- Update dependencies.

## 3.36.0

- Add `lock` option.

## 3.35.4

- Cover the bug of history.scrollRestoration.

## 3.35.3

- Update dependencies.

## 3.35.2

- Improve area selector splitting.

## 3.35.1

- Update dependencies.

## 3.35.0

- Use webpack.

## 3.34.0

- Move router function to spica.

## 3.33.5

- Update dependencies.

## 3.33.4

- Update dependencies.

## 3.33.3

- Update dependencies.

## 3.33.2

- Update dependencies.

## 3.33.1

- Update dependencies.

## 3.33.0

- Support HTMLAreaElement.

## 3.32.0

- Add Pjax.sync, Pjax.pushURL, and Pjax.replaceURL methods.

## 3.31.2

- Update dependencies.

## 3.31.1

- Don't mutate a cross-origin object `history.state`.

## 3.31.0

- Update compile target to ES2018.
- Enable esModuleInterop option.

## 3.30.1

- Update dependencies.

## 3.30.0

- Remove support for old Edge browser.

## 3.29.11

- Update dependencies.

## 3.29.10

- Always cancel the page transition when a link is clicked or URL is changed.

## 3.29.9

- Remove only an empty query of URL.

## 3.29.8

- Don't remove trailing slash of URL.

## 3.29.7

- Fix support for Edge browser.

## 3.29.6

- Fix `Cache-Control` header handling.

## 3.29.5

- Fix cache processing to ignore URL hash.

## 3.29.4

- Support `Cache-Control` header's `no-cache` and `no-store` parameters.

## 3.29.3

- Fix a pollution of `fetch.headers` option.

## 3.29.2

- Call `Sequence.fetch` function before sending a request.

## 3.29.1

- Support `Cache-Control` header's `max-age` parameter.

## 3.29.0

- Support `ETag` header.
  - Add `If-None-Match` header to requests.

## 3.28.4

- Improve document object creation.

## 3.28.3

- Fix support for Edge browser.

## 3.28.2

- Fix URL control with shared caches.

## 3.28.1

- Fix cache feature.

## 3.28.0

- Add cache feature.
  - Add `fetch.cache` option.
- Move and rename `redirect` option to `fetch.rewrite`.
- Move `rewrite` option to `update.rewrite`.

## 3.27.2

- Add `Accept` header to requests.

## 3.27.1

- Use fetch API for script loading.

## 3.27.0

- Change the return types of APIs to express that the request is accepted or not.

## 3.26.2

- Fix distribution.

## 3.26.1

- Fix bundle processing.

## 3.26.0

- Handle events dispatched in shadow DOM.

## 3.25.0

- Validate script integrity.

## 3.24.2

- Add license notice.

## 3.24.1

- Micro refactoring.

## 3.24.0

- Add `X-Requested-With: XMLHttpRequest` header.
- Fix a url transition bug with hash link.

## 3.23.0

- Update module exports.

## 3.22.0

- Add `headers` property to sequence.fetch option's parameter.
- Change the property name from `data` to `body` of sequence.fetch option's parameter.

## 3.21.3

- Micro refactoring.

## 3.21.2

- Remove config.update.fallback option.

## 3.21.1

- Don't retry script loading with same origin.

## 3.21.0

- Enhance script loading to avoid Same-origin policy only with async scripts.

## 3.20.3

- Fix the copyright notice.

## 3.20.2

- Enhance CSS synchronization.

## 3.20.1

- Fix call timing of rewrite option.

## 3.20.0

- Add redirect option.

## 3.19.0

- Compile to es2016.

## 3.18.2

- Fix focus processing.
- Fix dispatch timing of pjax:content event.

## 3.18.1

- Check target areas again after rewriting sources.

## 3.18.0

- Add pjax:content event.
- Refine sequence feature.

## 3.17.8

- Micro refactoring.

## 3.17.7

- Fix scroll position restoration.

## 3.17.6

- Fix config object pollution.

## 3.17.5

- Fix url-based transition disabling processing.

## 3.17.4

- Improve link and filter options' default value.

## 3.17.3

- Micro refactoring.

## 3.17.2

- Fix hash click behavior.
- Don't work with download attribute.

## 3.17.1

- Improve scope option's default value.

## 3.17.0

- Document the Router APIs.
- Remove unused APIs.

## 3.16.11

- Enable nested brace expansion.

## 3.16.10

- Fix pattern matching.

## 3.16.9

- Fix pattern matching.

## 3.16.8

- Fix pattern matching.

## 3.16.7

- Improve script deferred loading.

## 3.16.6

- Fix scroll by url hash.

## 3.16.5

- Don't encode url hash.

## 3.16.4

- Fix browser history logging.

## 3.16.3

- Fix hash click behavior.

## 3.16.2

- Fix url management about hash changes.

## 3.16.1

- Improve script loading.

## 3.16.0

- Make this usable in router config object.

## 3.15.2

- Fix script loading.
- Remove cooperation with document.currentScript.

## 3.15.1

- Improve loaded script checks.

## 3.15.0

- Change response data structure of Sequence.unload function's parameter.

## 3.14.1

- Micro refactoring.

## 3.14.0

- Remove dependencies.

## 3.13.0

- Change a license to Apache-2.0 AND MPL-2.0.

## 3.12.2

- Fix error handling.

## 3.12.1

- Micro refactoring.

## 3.12.0

- Improve Config.update.ignore option.

## 3.11.2

- Optimization.

## 3.11.1

- Fix wrong relative path resolving by cache.

## 3.11.0

- Improve url encoding.

## 3.10.4

- Update dependencies.

## 3.10.3

- Fix leaks of event listening.

## 3.10.2

- Work document.currentScript with script loading.

## 3.10.1

- Refactor Config.filter option's default value.

## 3.10.0

- Extend sequence feature.

## 3.9.3

- Fix embedded content handling.

## 3.9.2

- Fix embedded content handling.

## 3.9.1

- Micro refactoring.

## 3.9.0

- Support IPv6 literal url.
- Add typings of events.
- Improve url normalization.
- Fix form data serialization.
- Fix fallback processing.

## 3.8.0

- Ignore trailing slash of path in routing.
- Enhance router function.
- Fix invalid url processing.

## 3.7.0

- Add router function.
- Fix routing with wildcards.
- Improve url validation.

## 3.6.1

- Fix header name constraints.

## 3.6.0

- Use history.state.

## 3.5.4

- Fix error response handling.

## 3.5.3

- Fix popstate event behaviours in the same page.
- Fix assign/replace static methods.

## 3.5.2

- Update dependencies.

## 3.5.1

- Update dependencies.

## 3.5.0

- Use correct url with redirecting.

## 3.4.4

- Fix wildcard matching of scope feature.

## 3.4.3

- Update the Config.update.ignore option's default value.

## 3.4.2

- ~~Add support for bundling using Browserify.~~

## 3.4.1

- Add interop with es6 modules.

## 3.4.0

- Use Browserify.

## 3.3.6

- Fix support for Edge browser.
- Fix support for Android browser.

## 3.3.5

- Update dependencies.

## 3.3.4

- Fix internal polyfills.

## 3.3.3

- Fix the initial script detection.

## 3.3.2

- Update dependencies.

## 3.3.1

- Update the Config.update.ignore option's default value.

## 3.3.0

- Rename a config item `load` to `update`.

## 3.2.2

- Fix the Config.filter option's default implementation.

## 3.2.1

- Update dependencies.

## 3.2.0

- Add a concurrency integration feature.

## 3.1.0

- Change database names.

## 3.0.2

- Fix a xhr response parsing.

## 3.0.1

- Fix a bug of history fix.

## 3.0.0

- Upgrade.
