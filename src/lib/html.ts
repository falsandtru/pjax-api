import { Maybe, Just, Nothing, Either, Left, Right } from 'spica';
import { parse as parseHTML, find } from './dom';

type Parser = (html: string) => Maybe<Document>;
export const parse: Parser = [parseByDoc, parseByDOM]
  .reduce<Either<(html: string) => Document, Parser>>((m, parser) =>
    m.bind<Parser>(() => test(parser) ? Left(parser) : m)
  , Right(() => Nothing))
  .extract(parser => (html: string) => Just(parser(html)));

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
}

function fix(doc: Document): undefined {
  return void fixNoscript(doc)
    .forEach(([src, fixed]) => src.textContent = fixed.textContent);
}

function fixNoscript(doc: Document): [HTMLElement, HTMLElement][] {
  return find(doc, 'noscript')
    .filter(el => el.children.length > 0)
    .map<[HTMLElement, HTMLElement]>(el => {
      const clone: HTMLElement = <HTMLElement>el.cloneNode(true);
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
  </body>
</html>
`;
    const doc = parser(html);
    switch (false) {
      case doc.URL && decodeURI(doc.URL) === decodeURI(window.location.href):
      case doc.title === '&':
      case !!doc.querySelector('html.html[lang="en"]'):
      case !!doc.querySelector('head>link')!['href']:
      case !!doc.querySelector('body>a')!['href']:
      case !doc.querySelector('head>noscript>*'):
      case doc.querySelector('script')!['innerHTML'] === 'document.head.remove();':
      case doc.querySelector('head>noscript')!['textContent'] === '<style>/**/</style>':
      case doc.querySelector('body>noscript')!['textContent'] === 'noscript':
        throw void 0;
    }
    return true;
  } catch (err) {
    return false;
  }
}

export { fixNoscript as _fixNoscript }
