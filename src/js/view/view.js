
/* VIEW */

V = {
  OBSERVE: function() {
    V.$DRIVER.bind(M.NAMES.CHANGE, this.UPDATE);
  },

  BIND: function(selector) {
    V.UNBIND(selector);
    return V.$DRIVER.delegate(selector, 'click.' + M.NAME, this.HANDLERS.click);
  },
  UNBIND: function(selector) {
    return V.$DRIVER.undelegate(selector, 'click.' + M.NAME);
  },

  HANDLERS: {
    click: function(selector) {
      V.state = 1;
      C.OPERATE();
    }
  },

  // VIEWの遷移状態
  state: -1, // wait(-1), ready(0), lock(1), update(2)

  queue: [], // $.deferred()

  init: function() {
    V.state = 0;
  },

  UPDATE: function() {
    V.state = 2;
    console.log(M.RECEIVE());
    V.state = 0;
  }
};
