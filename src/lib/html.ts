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
  fix(document);
  return document;
}

function parseByDoc(html: string): Document {
  const document = window.document.implementation.createHTMLDocument('');
  document.open();
  document.write(html);
  document.close();
  fix(document);
  return document;
}

export function fix(document: Document): void {
  fixNoscript(document);
}

// Tags within noscript tags do not become elements if statically parsed from HTML.
function fixNoscript(document: Document): void {
  // :empty and :has do not work.
  for (const el of document.querySelectorAll('noscript')) {
    if (!el.firstElementChild) continue;
    el.textContent = el.innerHTML;
  }
  assert(!document.querySelector('noscript *'));
}

function test(parser: (html: string) => Document): boolean {
  try {
    const html = `
<html lang="en" class="html">
  <head>
    <link href="/">
    <title>&amp;</title>
    <noscript><style><></style></noscript>
  </head>
  <body>
    <noscript><style><></style></noscript>
    <a href="/"></a>
    <script>document.head.remove();</script>
    <img src="abc">
  </body>
</html>
`;
    const document = parser(html);
    switch (false) {
      case document.title === '&':
      case !!document.querySelector('html.html[lang="en"]'):
      case !!document.querySelector('head > link')!.href:
      case !!document.querySelector('body > a')!.href:
      case !document.querySelector('noscript > *'):
      case document.querySelector('script')!.innerHTML === 'document.head.remove();':
      case document.querySelector('img')!.src.endsWith('abc'):
      case document.querySelector('head > noscript')!.textContent === '<style><></style>':
      case document.querySelector('body > noscript')!.textContent === '<style><></style>':
        throw undefined;
    }
    return true;
  }
  catch {
    return false;
  }
}
