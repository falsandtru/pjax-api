
/* CONTROLLER */

C = {
  EXEC: function() {
    return M.MAIN.apply(M, [C.EXTEND(this)].concat([].slice.call(arguments)));
  },

  FUNCTIONS: {
    testFunction: function() {
      return 'function';
    }
  },

  METHODS: {
    testMethod: function() {
      return 'method';
    }
  },

  PROPERTIES: {},

  EVENTS: {},

  state: -1,

  queue: [], // $.deferred()

  init: function() {
    C.state = 0;
  },

  OPERATE: function() {
    M.SEND();
  }
};
