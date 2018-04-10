import { content, separate, _split as split, _wait as wait } from './content';
import { parse } from '../../../../../lib/html';
import { html } from 'typed-dom';

describe('Unit: layer/domain/router/module/update/content', () => {
  describe('content', () => {
    it('body', () => {
      const src = parse('<body id="id" class="class"><hr></body>').extract();
      const dst = parse('<body></body>').extract();
      const docs = { src, dst };
      content(docs, separate(docs, ['body']).fmap(([, areas]) => areas).extract());
      assert(dst.body.id === 'id');
      assert(dst.body.className === 'class');
      assert(dst.body.innerHTML === '<hr>');
    });

    it('multiple', () => {
      const src = parse('<div class="class"></div><div id="id">a</div><div class="class">c</div>').extract();
      const dst = parse('<div id="id"></div><div class="class">b</div><div class="class"></div>').extract();
      const docs = { src, dst };
      content(docs, separate(docs, ['_', '#id, .class', '.class', '_']).fmap(([, areas]) => areas).extract());
      assert(dst.body.innerHTML === '<div id="id">a</div><div class="class"></div><div class="class">c</div>');
    });

    it('failure', done => {
      const src = parse('<div id="id">a</div><div class="class">c</div>').extract();
      const dst = parse('<div id="id"></div><div class="class">b</div><div class="class"></div>').extract();
      const docs = { src, dst };
      separate(docs, ['_', '#id, .class', '.class', '_']).fmap(([, areas]) => areas).extract(done);
    });

  });

  describe('split', () => {
    it('single', () => {
      assert.deepStrictEqual(
        split('body'),
        ['body']);
    });

    it('multiple', () => {
      assert.deepStrictEqual(
        split('#id, .class[data-pjax]'),
        ['#id', '.class[data-pjax]']);
    });

  });

  describe('wait', () => {
    it('img', done => {
      const el = html('img', { src: './' });
      document.body.appendChild(el);
      wait(el)
        .then(() => (el.remove(), done()));
    });

    it('iframe', done => {
      const el = html('iframe', { src: './' });
      document.body.appendChild(el);
      wait(el)
        .then(() => (el.remove(), done()));
    });

  });

});
