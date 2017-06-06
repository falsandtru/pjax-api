import { hash } from './scroll';
import { parse } from '../../../../../lib/html';
import { Url } from '../../../../../lib/url';
import { standardizeUrl } from '../../../../data/model/domain/url';
import DOM from 'typed-dom';

describe('Unit: layer/domain/router/module/update/scroll', () => {
  describe('hash', () => {
    it('exist', () => {
      let cnt = 0;
      const result = hash(
        parse(DOM.body([
          DOM.div({ id: 'hash' }, []),
        ]).element.outerHTML).extract(),
        new Url(standardizeUrl('#hash')).fragment,
        {
          scroll: (x?: number, y?: number) => {
            assert(cnt === 0 && ++cnt);
            assert(x! >= 0);
            assert(y! >= 0);
          }
        });
      assert(result === true);
      assert(cnt === 1 && ++cnt);
    });

    it('not exist', () => {
      let cnt = 0;
      const result = hash(
        parse(DOM.body([
        ]).element.outerHTML).extract(),
        new Url(standardizeUrl('#hash')).fragment,
        {
          scroll: () => {
            throw new Error();
          }
        });
      assert(result === false);
      assert(cnt === 0 && ++cnt);
    });

  });

});
