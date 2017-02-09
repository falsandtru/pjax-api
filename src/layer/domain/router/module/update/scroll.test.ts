import { hash } from './scroll';
import { parse } from '../../../../../lib/html';
import DOM from 'typed-dom';
import { Url } from '../../../../../lib/url';
import { canonicalizeUrl } from '../../../../data/model/canonicalization/url';
import { validateUrl } from '../../../../data/model/validation/url';

describe('Unit: layer/domain/router/module/update/scroll', () => {
  describe('hash', () => {
    it('exist', () => {
      let cnt = 0;
      const result = hash(
        parse(DOM.body([
          DOM.div({ id: 'hash' }, []),
        ]).element.outerHTML).extract(),
        new Url(canonicalizeUrl(validateUrl('#hash'))).hash,
        {
          scroll: (x?: number, y?: number): void => {
            assert(++cnt === 1);
            assert(x! >= 0);
            assert(y! >= 0);
          }
        });
      assert(++cnt === 2 && result === true);
    });

    it('not exist', () => {
      let cnt = 0;
      const result = hash(
        parse(DOM.body([
        ]).element.outerHTML).extract(),
        new Url(canonicalizeUrl(validateUrl('#hash'))).hash,
        {
          scroll: () => {
            throw new Error();
          }
        });
      assert(++cnt === 1 && result === false);
    });

  });

});
