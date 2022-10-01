import { Maybe, Just, Nothing } from 'spica/maybe';
import { Either, Left, Right } from 'spica/either';

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
  void fixNoscript(doc);
}

function fixNoscript(doc: Document): void {
  for (const el of doc.querySelectorAll('noscript')) {
    if (!el.firstElementChild) continue;
    el.textContent = el.innerHTML;
  }
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
      case doc.title === '&':
      case !!doc.querySelector('html.html[lang="en"]'):
      case !!doc.querySelector('head > link')!.href:
      case !!doc.querySelector('body > a')!.href:
      case !doc.querySelector('head > noscript > *'):
      case doc.querySelector('script')!.innerHTML === 'document.head.remove();':
      case doc.querySelector('img')!.src.endsWith('abc'):
      case doc.querySelector('head > noscript')!.textContent === '<style>/**/</style>':
      case doc.querySelector('body > noscript')!.textContent === 'noscript':
        throw void 0;
    }
    return true;
  }
  catch {
    return false;
  }
}
