import { noop } from './noop';

export function parse(html: string): HTMLElement {
  const parser = document.createElement('div');
  parser.innerHTML = html;
  return parser.firstElementChild
    ? <HTMLElement>parser.firstElementChild
    : parser;
}

export function find<T extends HTMLElement>(el: HTMLElement | Document, selector: string): T[] {
  return <T[]>Array.from(el.querySelectorAll(selector || '_') || []);
}

export function bind(el: HTMLElement | Document | Window, type: string, listener: (ev: Event) => any, option: boolean | EventListenerOption = false): () => undefined {
  void el.addEventListener(type, handler, adjustEventListenerOptions(option));
  let unbind: () => undefined = () => (
    unbind = noop,
    void el.removeEventListener(type, handler, adjustEventListenerOptions(option)));
  return () => void unbind();

  function handler(ev: Event) {
    ev._currentTarget = <HTMLElement>ev.currentTarget;
    if (typeof option === 'object' && option.passive) {
      ev.preventDefault = noop;
    }
    void listener(ev);
  }
}

export function once(el: HTMLElement | Document | Window, type: string, listener: (ev: Event) => any, option: boolean | EventListenerOption = false): () => undefined {
  let unbind: () => undefined = bind(el, type, ev => (
    void unbind(),
    unbind = noop,
    void listener(ev)),
    option);
  return () => void unbind();
}

export function delegate(el: HTMLElement, selector: string, type: string, listener: (ev: Event) => any, option: EventListenerOption = { capture: true }): () => undefined {
  return bind(el, type, ev => {
    const cx = (<HTMLElement>ev.target).closest(selector);
    if (!cx) return;
    void find(el, selector)
      .filter(el => el === cx)
      .forEach(el =>
        void once(el, type, ev => (
          ev._currentTarget = <HTMLElement>ev.currentTarget,
          void listener(ev)
        ), option));
  }, { ...option, capture: true });
}

export function serialize(form: HTMLFormElement): string {
  return (<HTMLInputElement[]>Array.from(form.elements))
    .filter(el => {
      if (el.disabled) return false;
      switch (el.nodeName.toLowerCase()) {
        case 'input':
          switch (el.type.toLowerCase()) {
            case 'checkbox':
            case 'radio':
              return el.checked;
            case 'submit':
            case 'button':
            case 'image':
            case 'reset':
            case 'file':
              return false;
            default:
              return true;
          }
        case 'select':
        case 'textarea':
          return true;
        default:
          return false;
      }
    })
    .filter(el =>
      typeof el.name === 'string' &&
      typeof el.value === 'string')
    .map(el =>
      [
        encodeURIComponent(removeInvalidSurrogatePairs(el.name)),
        encodeURIComponent(removeInvalidSurrogatePairs(el.value)),
      ].join('='))
    .join('&');

  function removeInvalidSurrogatePairs(str: string): string {
    return str.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]?|[\uDC00-\uDFFF]/g, str => str.length === 2 ? str : '');
  }
}

let supportEventListenerOptions = false;
try {
  document.createElement("div").addEventListener("test", function () { }, <any>{
    get capture() {
      return supportEventListenerOptions = true;
    }
  });
} catch (e) { }
interface EventListenerOption {
  capture?: boolean;
  passive?: boolean;
}
function adjustEventListenerOptions(option: boolean | EventListenerOption): boolean | undefined {
  return supportEventListenerOptions
    ? <boolean>option
    : typeof option === 'boolean' ? option : option.capture;
}
