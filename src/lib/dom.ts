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
  return () => void el.removeEventListener(type, handler, adjustEventListenerOptions(option));

  function handler(ev: Event) {
    ev._currentTarget = <HTMLElement>ev.currentTarget;
    void listener(ev);
  }
}

export function once(el: HTMLElement | Document | Window, type: string, listener: (ev: Event) => any, option: boolean | EventListenerOption = false): () => undefined {
  let done = false;
  let unbind: () => void = bind(el, type, ev => (
    void unbind(),
    done = true,
    listener(ev)),
    adjustEventListenerOptions(option));
  return (): undefined => done ? void 0 : void unbind();
}

export function delegate(el: HTMLElement, selector: string, type: string, listener: (ev: Event) => any): () => undefined {
  void el.addEventListener(type, handler, true);
  return () => void el.removeEventListener(type, handler, true);

  function handler(ev: Event) {
    const cx = (<HTMLElement>ev.target).closest(selector);
    if (!cx) return;
    void find(el, selector)
      .filter(el => el === cx)
      .forEach(el => el.addEventListener(type, handler, false));
    function handler(ev: Event) {
      ev._currentTarget = <HTMLElement>ev.currentTarget;
      void ev._currentTarget.removeEventListener(type, handler);
      void listener(ev);
    }
  }
}

export function serialize(form: HTMLFormElement): string {
  return (<HTMLInputElement[]>Array.from(form.elements))
    .filter(el =>
      el.name &&
      !el.disabled &&
      (el.checked || !/^(?:checkbox|radio)$/i.test(el.type)) &&
      /^(?:input|select|textarea|keygen)/i.test(el.nodeName) &&
      !/^(?:submit|button|image|reset|file)$/i.test(el.type))
    .map(el =>
      [
        encodeURIComponent(el.name),
        encodeURIComponent(el.value === null ? '' : el.value.replace(/\r?\n/g, '\r\n'))
      ].join('='))
    .join('&');
}

let supportEventListenerOptions = false;
try {
  window.addEventListener("test", <any>null, Object.defineProperty({}, 'capture', {
    get: function () {
      supportEventListenerOptions = true;
    }
  }));
} catch (e) { }
interface EventListenerOption {
  capture?: boolean;
  passive?: boolean;
}
function adjustEventListenerOptions(option: boolean | EventListenerOption): boolean | undefined {
  return supportEventListenerOptions
    ? <boolean>option
    : (<EventListenerOption>option).capture;
}
