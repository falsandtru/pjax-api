import { find } from '../../../../../lib/dom';

export function focus(document: Document): undefined {
  return void find(document, 'body, [autofocus]')
    .slice(-1)
    .filter(el => document === window.document && el !== document.activeElement)
    .forEach(el => void el.focus());
}
