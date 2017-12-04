---
layout: layout
title: Event
type: page
nav: nav
class: style-api style-api-detail
---

# Event

## pjax:fetch

Dispatched from `window` object after requesting the page.

## pjax:unload

Dispatched from `window` object before updating the page.

## pjax:content

Dispatched from `document` object after updating the contents and styles, before loading scripts and scrolling.

## pjax:ready

Dispatched from `document` object after updating the contents, styles, and scripts.

## pjax:load

Dispatched from `window` object after updating the page.
This event waits for loading of `img`, `iframe` and `frame` elements.
