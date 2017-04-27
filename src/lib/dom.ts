import { noop } from './noop';

export function parse(html: string): HTMLElement {
  const parser = document.createElement('div');
  parser.innerHTML = html;
  return parser.firstElementChild
    ? <HTMLElement>parser.firstElementChild
    : parser;
}

export function find<T extends HTMLElement>(target: HTMLElement | Document, selector: string): T[] {
  return <T[]>Array.from(target.querySelectorAll(selector || '_'));
}

export function bind<T extends keyof WindowEventMap>(target: Window, type: T, listener: (ev: WindowEventMap[T]) => any, option?: boolean | EventListenerOption): () => undefined;
export function bind<T extends keyof DocumentEventMap>(target: Document, type: T, listener: (ev: DocumentEventMap[T]) => any, option?: boolean | EventListenerOption): () => undefined;
export function bind<T extends keyof HTMLElementEventMap>(target: HTMLElement, type: T, listener: (ev: HTMLElementEventMap[T]) => any, option?: boolean | EventListenerOption): () => undefined;
export function bind<T extends keyof WindowEventMap | keyof DocumentEventMap | keyof HTMLElementEventMap>(target: Window | Document | HTMLElement, type: T, listener: (ev: Event) => any, option: boolean | EventListenerOption = false): () => undefined {
  void target.addEventListener(type, handler, adjustEventListenerOptions(option));
  let unbind: () => undefined = () => (
    unbind = noop,
    void target.removeEventListener(type, handler, adjustEventListenerOptions(option)));
  return () => void unbind();

  function handler(ev: Event) {
    ev._currentTarget = <Window | Document | HTMLElement>ev.currentTarget;
    if (typeof option === 'object' && option.passive) {
      ev.preventDefault = noop;
    }
    void listener(ev);
  }
}

export function once<T extends keyof WindowEventMap>(target: Window, type: T, listener: (ev: WindowEventMap[T]) => any, option?: boolean | EventListenerOption): () => undefined;
export function once<T extends keyof DocumentEventMap>(target: Document, type: T, listener: (ev: DocumentEventMap[T]) => any, option?: boolean | EventListenerOption): () => undefined;
export function once<T extends keyof HTMLElementEventMap>(target: HTMLElement, type: T, listener: (ev: HTMLElementEventMap[T]) => any, option?: boolean | EventListenerOption): () => undefined;
export function once<T extends keyof WindowEventMap | keyof DocumentEventMap | keyof HTMLElementEventMap>(target: Window | Document | HTMLElement, type: T, listener: (ev: Event) => any, option: boolean | EventListenerOption = false): () => undefined {
  const unbind: () => undefined = bind(<Window>target, <keyof WindowEventMap>type, ev => {
    void unbind();
    void listener(ev);
  }, option);
  return () => void unbind();
}

export function delegate<T extends keyof HTMLElementEventMap>(target: HTMLElement, selector: string, type: T, listener: (ev: HTMLElementEventMap[T]) => any, option: EventListenerOption = {}): () => undefined {
  return bind(target, type, ev => {
    const cx = (<HTMLElement>ev.target).closest(selector);
    if (!cx) return;
    void find(target, selector)
      .filter(el => el === cx)
      .forEach(el =>
        void once(el, type, ev => {
          ev._currentTarget = <HTMLElement>ev.currentTarget;
          void listener(ev);
        }, option));
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
