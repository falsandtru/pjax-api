---
layout: layout
title: Router
type: page
nav: nav
class: style-api style-api-detail
---

# Router

## router\<T>(config: Record<string, (path: string) => T>): (url: string) => T;

Make a router function.
You can use `{}`, `*`, and `?` metacharacters for path matching.

```ts
import { router } from 'pjax-api';

const route = router({
'/'(path) {
    assert(this instanceof Object);
    assert(path === '/a');
    return '/';
},
'/b'(path) {
    assert(this instanceof Object);
    assert(path === '/b');
    return '/b';
},
'/b/'(path) {
    assert(this instanceof Object);
    assert(path === '/b/');
    return '/b/';
},
'/c'(path) {
    assert(this instanceof Object);
    assert(path === '/c/?q');
    return '/c';
}
});
assert(route('/a') === '/');
assert(route('/b') === '/b');
assert(route('/b/') === '/b/');
assert(route('/c/?q') === '/c');
```
