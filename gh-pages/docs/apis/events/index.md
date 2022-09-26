---
layout: layout
title: Events
type: page
nav: nav
class: style-api style-api-detail
---

# Events

## pjax:fetch

Dispatched from the `window` object after requesting the page.

## pjax:unload

Dispatched from the `window` object before updating the page.

## pjax:content

Dispatched from the `document` object after updating the contents, styles, and scripts, before scrolls.

## pjax:ready

Dispatched from the `document` object after updating the contents, styles, scripts, and scroll position.

## pjax:load

Dispatched from the `window` object after updating the page.
This event waits for loading of `img`, `iframe` and `frame` elements.
