import { Maybe, Just, Nothing } from 'spica/maybe';
import { Either, Left, Right } from 'spica/either';
import { find } from './dom';

type Parser = (html: string) => Maybe<Document>;

export const parse: Parser = [parseByDoc, parseByDOM]
  .reduce<Either<(html: string) => Document, Parser>>((m, parser) =>
    m.bind<Parser>(() => test(parser) ? Left(parser) : m)
  , Right(() => Nothing))
  .extract(parser => (html: string): Maybe<Document> => Just(parser(html)));

function parseByDOM(html: string): Document {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  void fix(doc);
  return doc;
}

function parseByDoc(html: string): Document {
  const document = window.document.implementation.createHTMLDocument('');
  const title = find(parseHTML(html.slice(0, html.search(/<\/title>/i) + 8)), 'title')
    .reduce((title, el) => el.textContent || title, '');
  if ('function' === typeof DOMParser) {
    document.title = title;
  }
  void document.open();
  void document.write(html);
  void document.close();
  if (document.title !== title) {
    document.title = document.querySelector('title')!.textContent || '';
  }
  void fix(document);
  return document;

  function parseHTML(html: string): HTMLElement {
    const parser = document.createElement('div');
    parser.innerHTML = html;
    return parser.firstElementChild
      ? parser.firstElementChild as HTMLElement
      : parser;
  }
}

function fix(doc: Document): undefined {
  return void fixNoscript(doc)
    .forEach(([src, fixed]) => src.textContent = fixed.textContent);
}

function fixNoscript(doc: Document): [HTMLElement, HTMLElement][] {
  return find(doc, 'noscript')
    .filter(el => el.children.length > 0)
    .map<[HTMLElement, HTMLElement]>(el => {
      const clone = el.cloneNode(true) as HTMLElement;
      clone.textContent = el.innerHTML;
      return [el, clone];
    });
}

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

export { fixNoscript as _fixNoscript }
