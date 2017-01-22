import { Config } from './config';
import DOM from 'typed-dom';

describe('Unit: layer/domain/data/config', () => {
  describe('Config', () => {
    it('filter', () => {
      const filter = new Config({}).filter;
      assert(filter(DOM.a({ href: '' }, []).element));
      assert(filter(DOM.a({ href: '/' }, []).element));
      assert(filter(DOM.a({ href: '/dir' }, []).element));
      assert(filter(DOM.a({ href: '/dir/' }, []).element));
      assert(filter(DOM.a({ href: '/dir/file.html' }, []).element));
      assert(filter(DOM.a({ href: '?' }, []).element));
      assert(filter(DOM.a({ href: '#' }, []).element));
    });

  });

});
