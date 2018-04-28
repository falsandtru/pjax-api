import { Maybe, Just, Nothing } from 'spica/maybe';
import { Either, Left, Right } from 'spica/either';
import { tuple } from 'spica/tuple';
import { find } from './dom';

type Parser = (html: string) => Maybe<Document>;

export const parse: Parser = [parseByDOM, parseByDoc]
  .reduce<Either<(html: string) => Document, Parser>>((m, f) =>
    m.bind(() => test(f) ? Left(f) : m)
  , Right(() => Nothing))
  .extract(f => html => Just(f(html)));

function parseByDOM(html: string): Document {
  const document = new DOMParser().parseFromString(html, 'text/html');
  void fix(document);
  return document;
}

function parseByDoc(html: string): Document {
  const document = window.document.implementation.createHTMLDocument('');
  void document.open();
  void document.write(html);
  void document.close();
  void fix(document);
  return document;
}

export function fix(doc: Document): void {
  void fixNoscript(doc)
    .forEach(([src, fixed]) => src.textContent = fixed.textContent);
}

function fixNoscript(doc: Document): [HTMLElement, HTMLElement][] {
  return find(doc, 'noscript')
    .filter(el => el.children.length > 0)
    .map(el => {
      const clone = el.cloneNode(true) as HTMLElement;
      clone.textContent = el.innerHTML;
      return tuple([el, clone]);
    });
}
export { fixNoscript as _fixNoscript }

function test(parser: (html: string) => Document): boolean {
  try {
    const html = `
<html lang="en" class="html">
  <head>
    <link href="/">
    <title>&amp;</title>
    <noscript><style>/**/</style></noscript>
  </head>
  <body>
    <noscript>noscript</noscript>
    <a href="/"></a>
    <script>document.head.remove();</script>
    <img src="abc">
  </body>
</html>
`;
    const doc = parser(html);
    switch (false) {
      case doc.URL && doc.URL.startsWith(`${window.location.protocol}//${window.location.host}`):
      case doc.title === '&':
      case !!doc.querySelector('html.html[lang="en"]'):
      case !!doc.querySelector<HTMLLinkElement>('head > link')!.href:
      case !!doc.querySelector<HTMLAnchorElement>('body > a')!.href:
      case !doc.querySelector('head > noscript > *'):
      case doc.querySelector<HTMLElement>('script')!.innerHTML === 'document.head.remove();':
      case doc.querySelector('img')!.src.endsWith('abc'):
      case doc.querySelector<HTMLElement>('head > noscript')!.textContent === '<style>/**/</style>':
      case doc.querySelector<HTMLElement>('body > noscript')!.textContent === 'noscript':
        throw undefined;
    }
    return true;
  }
  catch {
    return false;
  }
}
