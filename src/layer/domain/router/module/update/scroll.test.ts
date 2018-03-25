import { _hash as hash } from './scroll';
import { parse } from '../../../../../lib/html';
import { URL } from '../../../../../lib/url';
import { standardizeUrl } from '../../../../data/model/domain/url';
import { html } from 'typed-dom';

describe('Unit: layer/domain/router/module/update/scroll', () => {
  describe('hash', () => {
    it('exist', () => {
      let cnt = 0;
      const result = hash(
        parse(html('body', [
          html('div', { id: 'hash.#' }),
        ]).outerHTML).extract(),
        new URL(standardizeUrl('#hash.#')).fragment,
        {
          scrollToElement: (el) => {
            assert(el.id === 'hash.#');
            assert(cnt === 0 && ++cnt);
          }
        });
      assert(result === true);
      assert(cnt === 1 && ++cnt);
    });

    it('not exist', () => {
      let cnt = 0;
      const result = hash(
        parse(html('body', [
        ]).outerHTML).extract(),
        new URL(standardizeUrl('#hash.#')).fragment,
        {
          scrollToElement: () => {
            throw new Error();
          }
        });
      assert(result === false);
      assert(cnt === 0 && ++cnt);
    });

  });

});
