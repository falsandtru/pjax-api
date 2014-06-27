
// >>>>>  Template Driver  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  var _$ = arguments[arguments.length - 1];

  M = _$.extend(true, {
    // プラグインロード時に一度だけ実行される
    INIT: function() {
      M.init();
    },
    init: function() {},

    // uidを生成
    UID: function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16).toUpperCase();
      });
    },

    // プラグインの本体
    MAIN: function() {
      return M.main.apply(this, arguments);
    }
  }, M);

  V = _$.extend(true, {
    // VIEWのルート document/window
    DRIVER: document,
    $DRIVER: $ && $(document),

    // スクリプトロード時に一度だけ実行される
    INIT: function() {
      V.OBSERVE();
      V.init();
    },
    init: function() {},

    // VIEWが監視するMVCイベントを登録
    OBSERVE: function() {},

    // VIEWにする要素を選択/解除する
    BIND: function() {},
    UNBIND: function() {},

    // イベント、データ属性、クラスなどで使用する名前
    NAMES: {},

    // UIのイベントに登録されるハンドラ
    HANDLERS: {}
  }, V);

  C = _$.extend(true, {
    // CONTROLLERのルート
    DRIVER: V.DRIVER,
    $DRIVER: V.$DRIVER,

    // スクリプトロード時に一度だけ実行される
    INIT: function() {
      // プラグインに関数を設定してネームスペースに登録
      // $.mvc.func, $().mvc.funcとして実行できるようにするための処理
      if (NAMESPACE && NAMESPACE == NAMESPACE.window) {
        NAMESPACE[M.NAME] = C.EXEC;
      } else {
        NAMESPACE[M.NAME] = NAMESPACE.prototype[M.NAME] = C.EXEC;
      }

      C.UPDATE_PROPERTIES(NAMESPACE[M.NAME], C.FUNCTIONS);
      C.REGISTER_FUNCTIONS(NAMESPACE[M.NAME]);
      C.OBSERVE();
      C.init();
    },
    init: function() {},

    // CONTROLLERが監視するMVCイベントを登録
    OBSERVE: function() {},

    // コンテキストを更新する
    EXTEND: function($context) {
      if ($context === NAMESPACE || NAMESPACE && NAMESPACE == NAMESPACE.window) {
        // コンテキストをプラグインに変更
        $context = NAMESPACE[M.NAME];
      } else
      // $().mvc()として実行された場合の処理
      if ($context instanceof NAMESPACE) {
        if ($context instanceof jQuery) {
          // コンテキストへの変更をend()で戻せるようadd()
          $context = $context.add();
        }
      }
      // コンテキストのプロパティを更新
      C.UPDATE_PROPERTIES($context, C.FUNCTIONS);
      C.UPDATE_PROPERTIES($context, C.METHODS);
      // コンテキストに関数とメソッドを設定
      C.REGISTER_FUNCTIONS($context);
      C.REGISTER_METHODS($context);
      return $context;
    },

    // プラグインとして代入される
    EXEC: function() {
      C.execute.apply(this, arguments);
      return M.MAIN.apply(this, arguments);
    },
    execute: function() {},

    // プラグインのプロパティを更新する
    UPDATE_PROPERTIES: function($context, funcs) {
      var props = C.PROPERTIES;

      var i;
      for (i in props) {
        if (funcs[i]) {
          $context[i] = _$.proxy(funcs[i], $context)();
        }
      }
      return $context;
    },

    // プラグインにCONTROLLERの関数を登録する
    REGISTER_FUNCTIONS: function($context) {
      var funcs = C.FUNCTIONS,
          props = C.PROPERTIES;

      var i;
      for (i in funcs) {
        if (!props[i]) {
          $context[i] = _$.proxy(funcs[i], $context);
        }
      }
      return $context;
    },

    // プラグインにCONTROLLERのメソッドを登録する
    REGISTER_METHODS: function($context) {
      var funcs = C.METHODS,
          props = C.PROPERTIES;

      var i;
      for (i in funcs) {
        if (!props[i]) {
          $context[i] = _$.proxy(funcs[i], $context);
        }
      }
      return $context;
    },

    // プラグインに登録される関数
    FUNCTIONS: {},

    // プラグインに登録されるメソッド
    METHODS: {
      uid: M.UID
    },

    // プラグインに登録されるプロパティ
    PROPERTIES: {
      uid: true
    },

    // プラグインが使用する自身のカスタムイベント
    EVENTS: {
    }
  }, C);

  M.INIT();
  V.INIT();
  C.INIT();

// <<<<<  Template Driver  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

})(window, window.document, void 0,
  // setTimeout
  function(vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
    var aArgs = Array.prototype.slice.call(arguments, 2);
    return window.setTimeout(vCallback instanceof Function ? function () {
      vCallback.apply(null, aArgs);
    } : vCallback, nDelay);
  },
  // jQuery
  function() {
    /*!
     * jQuery JavaScript Library v1.10.2
     * http://jquery.com/
     *
     * Includes Sizzle.js
     * http://sizzlejs.com/
     *
     * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
     * Released under the MIT license
     * http://jquery.org/license
     *
     * Date: 2013-07-03T13:48Z
     */
    // jQuery.extend, proxyだけ抜粋
    var
      // The deferred used on DOM ready
      readyList,

      // A central reference to the root jQuery(document)
      rootjQuery,

      // Support: IE<10
      // For `typeof xmlNode.method` instead of `xmlNode.method !== undefined`
      core_strundefined = typeof undefined,

      // Use the correct document accordingly with window argument (sandbox)
      //location = window.location,
      //document = window.document,
      docElem = document.documentElement,

      // Map over jQuery in case of overwrite
      _jQuery = window.jQuery,

      // Map over the $ in case of overwrite
      _$ = window.$,

      // [[Class]] -> type pairs
      class2type = {},

      // List of deleted data cache ids, so we can reuse them
      core_deletedIds = [],

      core_version = "1.10.2",

      // Save a reference to some core methods
      core_concat = core_deletedIds.concat,
      core_push = core_deletedIds.push,
      core_slice = core_deletedIds.slice,
      core_indexOf = core_deletedIds.indexOf,
      core_toString = class2type.toString,
      core_hasOwn = class2type.hasOwnProperty,
      core_trim = core_version.trim,

      // Define a local copy of jQuery
      jQuery = function(){};

    class2type = function() {
      var hashTable = {},
          arr = "Boolean Number String Function Array Date RegExp Object Error".split(" "),
          ai,
          name;
      for (ai = arr.length;name = arr[--ai];) {
        hashTable[ "[object " + name + "]" ] = name.toLowerCase();
      }
      return hashTable;
    }();

    function isArraylike( obj ) {
      var length = obj.length,
        type = jQuery.type( obj );

      if ( jQuery.isWindow( obj ) ) {
        return false;
      }

      if ( obj.nodeType === 1 && length ) {
        return true;
      }

      return type === "array" || type !== "function" &&
        ( length === 0 ||
        typeof length === "number" && length > 0 && ( length - 1 ) in obj );
    }

    jQuery.fn = jQuery.prototype;
    jQuery.extend = jQuery.fn.extend = function() {
      var src, copyIsArray, copy, name, options, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

      // Handle a deep copy situation
      if ( typeof target === "boolean" ) {
        deep = target;
        target = arguments[1] || {};
        // skip the boolean and the target
        i = 2;
      }

      // Handle case when target is a string or something (possible in deep copy)
      if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
        target = {};
      }

      // extend jQuery itself if only one argument is passed
      if ( length === i ) {
        target = this;
        --i;
      }

      for ( ; i < length; i++ ) {
        // Only deal with non-null/undefined values
        if ( (options = arguments[ i ]) != null ) {
          // Extend the base object
          for ( name in options ) {
            src = target[ name ];
            copy = options[ name ];

            // Prevent never-ending loop
            if ( target === copy ) {
              continue;
            }

            // Recurse if we're merging plain objects or arrays
            if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
              if ( copyIsArray ) {
                copyIsArray = false;
                clone = src && jQuery.isArray(src) ? src : [];

              } else {
                clone = src && jQuery.isPlainObject(src) ? src : {};
              }

              // Never move original objects, clone them
              target[ name ] = jQuery.extend( deep, clone, copy );

            // Don't bring in undefined values
            } else if ( copy !== undefined ) {
              target[ name ] = copy;
            }
          }
        }
      }

      // Return the modified object
      return target;
    };

    jQuery.extend({
      type: function( obj ) {
        if ( obj == null ) {
          return String( obj );
        }
        return typeof obj === "object" || typeof obj === "function" ?
          class2type[ core_toString.call(obj) ] || "object" :
          typeof obj;
      },
      // results is for internal usage only
      makeArray: function( arr, results ) {
        var ret = results || [];

        if ( arr != null ) {
          if ( isArraylike( Object(arr) ) ) {
            jQuery.merge( ret,
              typeof arr === "string" ?
              [ arr ] : arr
            );
          } else {
            core_push.call( ret, arr );
          }
        }

        return ret;
      },
      merge: function( first, second ) {
        var l = second.length,
          i = first.length,
          j = 0;

        if ( typeof l === "number" ) {
          for ( ; j < l; j++ ) {
            first[ i++ ] = second[ j ];
          }
        } else {
          while ( second[j] !== undefined ) {
            first[ i++ ] = second[ j++ ];
          }
        }

        first.length = i;

        return first;
      },
      isPlainObject: function( obj ) {
        var key;

        // Must be an Object.
        // Because of IE, we also have to check the presence of the constructor property.
        // Make sure that DOM nodes and window objects don't pass through, as well
        if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
          return false;
        }

        try {
          // Not own constructor property must be Object
          if ( obj.constructor &&
            !core_hasOwn.call(obj, "constructor") &&
            !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
            return false;
          }
        } catch ( e ) {
          // IE8,9 Will throw exceptions on certain host objects #9897
          return false;
        }

        // Support: IE<9
        // Handle iteration over inherited properties before own properties.
        if ( jQuery.support.ownLast ) {
          for ( key in obj ) {
            return core_hasOwn.call( obj, key );
          }
        }

        // Own properties are enumerated firstly, so to speed up,
        // if last one is own, then all properties are own.
        for ( key in obj ) {}

        return key === undefined || core_hasOwn.call( obj, key );
      },
      isFunction: function( obj ) {
        return jQuery.type(obj) === "function";
      },
      isArray: Array.isArray || function( obj ) {
        return jQuery.type(obj) === "array";
      },
      isWindow: function( obj ) {
        /* jshint eqeqeq: false */
        return obj != null && obj == obj.window;
      },
      // Bind a function to a context, optionally partially applying any
      // arguments.
      proxy: function( fn, context ) {
        var args, proxy, tmp;

        if ( typeof context === "string" ) {
          tmp = fn[ context ];
          context = fn;
          fn = tmp;
        }

        // Quick check to determine if target is callable, in the spec
        // this throws a TypeError, but we will just return undefined.
        if ( !jQuery.isFunction( fn ) ) {
          return undefined;
        }

        // Simulated bind
        args = core_slice.call( arguments, 2 );
        proxy = function() {
          return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
        };

        // Set the guid of unique handler to the same of original handler, so it can be removed
        //proxy.guid = fn.guid = fn.guid || jQuery.guid++;

        return proxy;
      }
    });

    jQuery.support = (function( support ) {

      var all, a, input, select, fragment, opt, eventName, isSupported, i,
        div = document.createElement("div");

      // Setup
      div.setAttribute( "className", "t" );
      div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

      // Finish early in limited (non-browser) environments
      all = div.getElementsByTagName("*") || [];
      a = div.getElementsByTagName("a")[ 0 ];
      if ( !a || !a.style || !all.length ) {
        return support;
      }

      // First batch of tests
      select = document.createElement("select");
      opt = select.appendChild( document.createElement("option") );
      input = div.getElementsByTagName("input")[ 0 ];

      a.style.cssText = "top:1px;float:left;opacity:.5";

      // Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
      support.getSetAttribute = div.className !== "t";

      // IE strips leading whitespace when .innerHTML is used
      support.leadingWhitespace = div.firstChild.nodeType === 3;

      // Make sure that tbody elements aren't automatically inserted
      // IE will insert them into empty tables
      support.tbody = !div.getElementsByTagName("tbody").length;

      // Make sure that link elements get serialized correctly by innerHTML
      // This requires a wrapper element in IE
      support.htmlSerialize = !!div.getElementsByTagName("link").length;

      // Get the style information from getAttribute
      // (IE uses .cssText instead)
      support.style = /top/.test( a.getAttribute("style") );

      // Make sure that URLs aren't manipulated
      // (IE normalizes it by default)
      support.hrefNormalized = a.getAttribute("href") === "/a";

      // Make sure that element opacity exists
      // (IE uses filter instead)
      // Use a regex to work around a WebKit issue. See #5145
      support.opacity = /^0.5/.test( a.style.opacity );

      // Verify style float existence
      // (IE uses styleFloat instead of cssFloat)
      support.cssFloat = !!a.style.cssFloat;

      // Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
      support.checkOn = !!input.value;

      // Make sure that a selected-by-default option has a working selected property.
      // (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
      support.optSelected = opt.selected;

      // Tests for enctype support on a form (#6743)
      support.enctype = !!document.createElement("form").enctype;

      // Makes sure cloning an html5 element does not cause problems
      // Where outerHTML is undefined, this still works
      support.html5Clone = document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>";

      // Will be defined later
      support.inlineBlockNeedsLayout = false;
      support.shrinkWrapBlocks = false;
      support.pixelPosition = false;
      support.deleteExpando = true;
      support.noCloneEvent = true;
      support.reliableMarginRight = true;
      support.boxSizingReliable = true;

      // Make sure checked status is properly cloned
      input.checked = true;
      support.noCloneChecked = input.cloneNode( true ).checked;

      // Make sure that the options inside disabled selects aren't marked as disabled
      // (WebKit marks them as disabled)
      select.disabled = true;
      support.optDisabled = !opt.disabled;

      // Support: IE<9
      try {
        delete div.test;
      } catch( e ) {
        support.deleteExpando = false;
      }

      // Check if we can trust getAttribute("value")
      input = document.createElement("input");
      input.setAttribute( "value", "" );
      support.input = input.getAttribute( "value" ) === "";

      // Check if an input maintains its value after becoming a radio
      input.value = "t";
      input.setAttribute( "type", "radio" );
      support.radioValue = input.value === "t";

      // #11217 - WebKit loses check when the name is after the checked attribute
      input.setAttribute( "checked", "t" );
      input.setAttribute( "name", "t" );

      fragment = document.createDocumentFragment();
      fragment.appendChild( input );

      // Check if a disconnected checkbox will retain its checked
      // value of true after appended to the DOM (IE6/7)
      support.appendChecked = input.checked;

      // WebKit doesn't clone checked state correctly in fragments
      support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

      // Support: IE<9
      // Opera does not clone events (and typeof div.attachEvent === undefined).
      // IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
      if ( div.attachEvent ) {
        div.attachEvent( "onclick", function() {
          support.noCloneEvent = false;
        });

        div.cloneNode( true ).click();
      }

      // Support: IE<9 (lack submit/change bubble), Firefox 17+ (lack focusin event)
      // Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
      for ( i in { submit: true, change: true, focusin: true }) {
        div.setAttribute( eventName = "on" + i, "t" );

        support[ i + "Bubbles" ] = eventName in window || div.attributes[ eventName ].expando === false;
      }

      div.style.backgroundClip = "content-box";
      div.cloneNode( true ).style.backgroundClip = "";
      support.clearCloneStyle = div.style.backgroundClip === "content-box";

      // Support: IE<9
      // Iteration over object's inherited properties before its own.
      for ( i in jQuery.makeArray( support ) ) {
        break;
      }
      support.ownLast = i !== "0";

      // Run tests that need a body at doc ready
      jQuery(function() {
        var container, marginDiv, tds,
          divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
          body = document.getElementsByTagName("body")[0];

        if ( !body ) {
          // Return for frameset docs that don't have a body
          return;
        }

        container = document.createElement("div");
        container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

        body.appendChild( container ).appendChild( div );

        // Support: IE8
        // Check if table cells still have offsetWidth/Height when they are set
        // to display:none and there are still other visible table cells in a
        // table row; if so, offsetWidth/Height are not reliable for use when
        // determining if an element has been hidden directly using
        // display:none (it is still safe to use offsets if a parent element is
        // hidden; don safety goggles and see bug #4512 for more information).
        div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
        tds = div.getElementsByTagName("td");
        tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
        isSupported = ( tds[ 0 ].offsetHeight === 0 );

        tds[ 0 ].style.display = "";
        tds[ 1 ].style.display = "none";

        // Support: IE8
        // Check if empty table cells still have offsetWidth/Height
        support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

        // Check box-sizing and margin behavior.
        div.innerHTML = "";
        div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";

        // Workaround failing boxSizing test due to offsetWidth returning wrong value
        // with some non-1 values of body zoom, ticket #13543
        jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
          support.boxSizing = div.offsetWidth === 4;
        });

        // Use window.getComputedStyle because jsdom on node.js will break without it.
        if ( window.getComputedStyle ) {
          support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
          support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

          // Check if div with explicit width and no margin-right incorrectly
          // gets computed margin-right based on width of container. (#3333)
          // Fails in WebKit before Feb 2011 nightlies
          // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
          marginDiv = div.appendChild( document.createElement("div") );
          marginDiv.style.cssText = div.style.cssText = divReset;
          marginDiv.style.marginRight = marginDiv.style.width = "0";
          div.style.width = "1px";

          support.reliableMarginRight =
            !parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
        }

        if ( typeof div.style.zoom !== core_strundefined ) {
          // Support: IE<8
          // Check if natively block-level elements act like inline-block
          // elements when setting their display to 'inline' and giving
          // them layout
          div.innerHTML = "";
          div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
          support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

          // Support: IE6
          // Check if elements with layout shrink-wrap their children
          div.style.display = "block";
          div.innerHTML = "<div></div>";
          div.firstChild.style.width = "5px";
          support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

          if ( support.inlineBlockNeedsLayout ) {
            // Prevent IE 6 from affecting layout for positioned elements #11048
            // Prevent IE from shrinking the body in IE 7 mode #12869
            // Support: IE<8
            body.style.zoom = 1;
          }
        }

        body.removeChild( container );

        // Null elements to avoid leaks in IE
        container = div = tds = marginDiv = null;
      });

      // Null elements to avoid leaks in IE
      all = select = fragment = opt = a = input = null;

      return support;
    })({});

    return jQuery;
  }()
);
