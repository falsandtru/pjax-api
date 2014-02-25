/*
 * 
 * pjax
 * 
 * ---
 * @Copyright(c) 2012, falsandtru
 * @license MIT http://opensource.org/licenses/mit-license.php
 * @version 1.32.4
 * @updated 2014/02/25
 * @author falsandtru https://github.com/falsandtru/
 * @CodingConventions Google JavaScript Style Guide
 * ---
 * Note:
 * 
 * ---
 * Example:
 * @jquery 1.7.2
 * 
 * $.pjax( { area: 'div.pjax:not(.no-pjax)' } ) ;
 * 
 * ---
 * Document:
 * https://github.com/falsandtru/jquery.pjax.js
 * 
 */

( function ( jQuery, window, document, undefined ) {
  
  var Store ;
  
  function registrate( jQuery, window, document, undefined, Store ) {
    jQuery.fn[ Store.name ] = jQuery[ Store.name ] = function () {
      
      return initialize.apply( this, [
        jQuery, window, document, undefined, Store
      ].concat( [].slice.call( arguments ) ) ) ;
    } ;
    Store.setProperties.call( jQuery[ Store.name ] ) ;
  }
  
  function initialize( jQuery, window, document, undefined, Store, option ) {
    
    var $context = this ;
    
    // polymorphism
    switch ( true ) {
      case typeof option === 'object':
        $context = $context instanceof jQuery ? $context : jQuery( document ) ;
        $context = Store.setProperties.call( $context, option.ns || '', null ) ;
        if ( !option.area && !option.scope ) {
          return $context ;
        }
        break ;
        
      default:
        $context = $context instanceof jQuery ? $context : jQuery[ Store.name ] ;
        return Store.setProperties.call( $context, null, null ) ;
    }
    
    // setting
    var setting ;
    setting = jQuery.extend( true,
      {
        id: 0,
        gns: Store.name,
        ns: null,
        area: null,
        link: 'a:not([target])',
        filter: function(){ return /(\/[^.]*|\.html?|\.php)([#?].*)?$/.test( this.href ); },
        form: null,
        scope: null,
        state: null,
        scrollTop: 0,
        scrollLeft: 0,
        ajax: { dataType: 'text' },
        contentType: 'text/html',
        cache: {
          click: false, submit: false, popstate: false, get: true, post: true,
          length: 9 /* pages */, size: 1*1024*1024 /* 1MB */, expire: 30*60*1000 /* 30min */
        },
        callback: function () {},
        callbacks: {
          ajax: {},
          update: { url: {}, title: {}, content: {}, scroll: {}, css: {}, script: {}, cache: { load: {}, save: {} }, rendering: {}, verify: {} },
          async: false
        },
        parameter: null,
        load: { css: false, script: false, execute: true, reload: '', reject: '', sync: true, ajax: { dataType: 'script' }, rewrite: null },
        interval: 300,
        wait: 0,
        scroll: { delay: 300 },
        fix: { location: true, history: true, scroll: true, reset: false },
        hashquery: false,
        fallback: true,
        database: true,
        server: { query: 'pjax=1' }
      },
      option
    ) ;
    setting.location = jQuery( '<a/>', { href: Store.canonicalizeURL( window.location.href ) } )[ 0 ] ;
    setting.destination = jQuery( '<a/>', { href: Store.canonicalizeURL( window.location.href ) } )[ 0 ] ;
    
    setting.nss = {
      array: [ Store.name ].concat( setting.ns && String( setting.ns ).split( '.' ) || [] )
    } ;
    jQuery.extend
    (
      true,
      setting = setting.scope && Store.scope( setting ) || setting,
      {
        nss: {
          name: setting.ns || '',
          event: setting.nss.array.join( '.' ),
          alias: Store.alias ? [ Store.alias ].concat( setting.nss.array.slice( 1 ) ).join( '.' ) : false,
          click: [ 'click' ].concat( setting.nss.array.join( ':' ) ).join( '.' ),
          submit: [ 'submit' ].concat( setting.nss.array.join( ':' ) ).join( '.' ),
          popstate: [ 'popstate' ].concat( setting.nss.array.join( ':' ) ).join( '.' ),
          scroll: [ 'scroll' ].concat( setting.nss.array.join( ':' ) ).join( '.' ),
          data: setting.nss.array.join( '-' ),
          class4html: setting.nss.array.join( '-' ),
          requestHeader: [ 'X', setting.nss.array[ 0 ].replace( /^\w/, function ( $0 ) { return $0.toUpperCase() ; } ) ].join( '-' )
        },
        areaback: setting.area,
        fix: !/Mobile(\/\w+)? Safari/i.test( window.navigator.userAgent ) ? { location: false, reset: false } : {},
        contentType: setting.contentType.replace( /\s*[,;]\s*/g, '|' ).toLowerCase(),
        scroll: { record: true, queue: [] },
        log: { script: {}, speed: {} },
        history: { order: [], data: {}, size: 0 },
        timeStamp: new Date().getTime(),
        disable: false,
        landing: Store.canonicalizeURL( window.location.href ),
        retry: true,
        xhr: null,
        speed: { now: function () { return new Date().getTime() ; } },
        option: option
      }
    ) ;
    
    // registrate
    if ( Store.supportPushState() ) {
      Store.registrate.call( $context, jQuery, window, document, undefined, Store, setting ) ;
    }
    
    return $context ; // function: pjax
  }
  
  Store = {
    name: 'pjax',
    alias: '',
    ids: [],
    settings: [0],
    count: 0,
    setAlias:  function ( name ) {
      Store.alias = typeof name === 'string' ? name : Store.alias ;
      if ( Store.name !== Store.alias && !jQuery[ Store.alias ] ) {
        jQuery[ Store.name ][ Store.alias ] = jQuery.fn[ Store.name ] ;
        jQuery.fn[ Store.alias ] = jQuery[ Store.alias ] = jQuery.fn[ Store.name ] ;
      }
    },
    IDBFactory: window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB,
    IDBDatabase: null,
    IDBKeyRange: window.IDBKeyRange || window.webkitIDBKeyRange || window.mozIDBKeyRange || window.msIDBKeyRange,
    parseHTML: null,
    setProperties: function ( namespace, element ) {
      
      var $context = this ;
      
      if ( $context instanceof jQuery || $context === jQuery[ Store.name ] ) {
        
        $context = $context instanceof jQuery && element !== undefined ? $context.add( element ) : $context ;
        
        $context[ Store.name ] = jQuery[ Store.name ] ;
        
        $context.on = function () {
          var setting = Store.settings[ 1 ] ;
          setting.disable = false ;
        } ;
        
        $context.off = function () {
          var setting = Store.settings[ 1 ] ;
          setting.disable = true ;
        } ;
        
        $context.click = function ( url, attr ) {
          var anchor ;
          switch ( true ) {
            case typeof url === 'object':
              anchor = jQuery( url ) ;
              break ;
              
            case !!url:
              attr = attr || {} ;
              attr.href = url ;
              anchor = jQuery( '<a/>', attr ) ;
              break ;
              
            default:
              return this ;
          }
          return anchor.first().one( 'click', 1, Store.click ).click() ;
        } ;
        
        $context.submit = function ( url, attr, data ) {
          var form, df = document.createDocumentFragment(), type, element ;
          switch ( true ) {
            case typeof url === 'object':
              form = jQuery( url ) ;
              break ;
              
            case !!data:
              attr = attr || {} ;
              attr.action = url ;
              type = data instanceof Array && Array || data instanceof Object && Object || undefined ;
              for ( var i in data ) {
                element = data[ i ] ;
                switch ( type ) {
                  case Object:
                    element = jQuery( '<textarea/>', { name: i } ).val( element ) ;
                    break ;
                  case Array:
                    element.attr = element.attr || {} ;
                    element.attr.name = element.name ;
                    element = jQuery( !element.tag.indexOf( '<' ) ? element.tag : '<' + element.tag + '/>', element.attr || {} ).val( element.value ) ;
                    break ;
                  default:
                    continue ;
                }
                df.appendChild( element[ 0 ] ) ;
              }
              form = jQuery( '<form/>', attr ).append( df ) ;
              break ;
              
            default:
              return this ;
          }
          return form.first().one( 'submit', 1, Store.submit ).submit() ;
        } ;
        
        $context.setCache = function ( url, data, textStatus, XMLHttpRequest ) {
          var setting = Store.settings[ 1 ] ;
          if ( !setting || !setting.history ) { return this ; }
          var cache, history, title, size ;
          history = setting.history ;
          url = Store.canonicalizeURL( url || window.location.href ) ;
          url = setting.hashquery ? url : url.replace( /#.*/, '' ) ;
          switch ( arguments.length ) {
            case 0:
            case 1:
              return arguments.callee.call( this, url, Store.trim( document.documentElement.outerHTML ) ) ;
            case 2:
            case 3:
            case 4:
            case 5:
            default:
              history.order.unshift( url ) ;
              for ( var i = 1, key ; key = history.order[ i ] ; i++ ) { if ( url === key ) { history.order.splice( i, 1 ) ; } }
              
              history.size > setting.cache.size && jQuery[ Store.name ].cleanCache() ;
              cache = jQuery[ Store.name ].getCache( url ) ;
              
              title = jQuery( '<span/>' ).html( Store.find( ( data || '' ) + ( ( XMLHttpRequest || {} ).responseText || '' ) + '<title></title>', /<title[^>]*?>([^<]*?)<\/title>/i ).shift() ).text() ;
              size = parseInt( ( ( data || '' ).length + ( ( XMLHttpRequest || {} ).responseText || '' ).length ) * 1.8 || 1024*1024, 10 ) ;
              history.size = history.size || 0 ;
              history.size += history.data[ url ] ? 0 : size ;
              history.data[ url ] = jQuery.extend(
                true,
                ( history.data[ url ] || {} ),
                {
                  XMLHttpRequest: XMLHttpRequest,
                  textStatus: textStatus,
                  data: data,
                  //css: undefined,
                  //script: undefined,
                  size: size,
                  timeStamp: new Date().getTime()
                }
              ) ;
              setting.database && setting.fix.history && Store.dbTitle( url, title ) ;
              break ;
          }
          return this ;
        } ;
        
        $context.getCache = function ( url ) {
          var setting = Store.settings[ 1 ] ;
          if ( !setting || !setting.history ) { return false ; }
          var history ;
          history = setting.history ;
          url = Store.canonicalizeURL( url || window.location.href ) ;
          url = setting.hashquery ? url : url.replace( /#.*/, '' ) ;
          history.data[ url ] && new Date().getTime() > history.data[ url ].timeStamp + setting.cache.expire && jQuery[ Store.name ].removeCache( url ) ;
          return history.data[ url ] ;
        } ;
        
        $context.removeCache = function ( url ) {
          var setting = Store.settings[ 1 ] ;
          if ( !setting || !setting.history ) { return this ; }
          var history ;
          history = setting.history ;
          url = Store.canonicalizeURL( url || window.location.href ) ;
          url = setting.hashquery ? url : url.replace( /#.*/, '' ) ;
          for ( var i = 0, key ; key = history.order[ i ] ; i++ ) {
            if ( url === key ) {
              history.order.splice( i, 1 ) ;
              history.size -= history.data[ key ].size ;
              history.data[ key ] = null ;
              delete history.data[ key ] ;
            }
          }
          return this ;
        } ;
        
        $context.clearCache = function () {
          var setting = Store.settings[ 1 ] ;
          if ( !setting || !setting.history ) { return this ; }
          var history = setting.history ;
          for ( var i = history.order.length, url ; url = history.order[ --i ] ; ) {
            history.order.splice( i, 1 ) ;
            history.size -= history.data[ url ].size ;
            delete history.data[ url ] ;
          }
          return this ;
        } ;
        
        $context.cleanCache = function () {
          var setting = Store.settings[ 1 ] ;
          if ( !setting || !setting.history ) { return this ; }
          var history = setting.history ;
          for ( var i = history.order.length, url ; url = history.order[ --i ] ; ) {
            if ( i >= setting.cache.length || url in history.data && new Date().getTime() > history.data[ url ].timeStamp + setting.cache.expire ) {
              history.order.splice( i, 1 ) ;
              history.size -= history.data[ url ].size ;
              delete history.data[ url ] ;
            }
          }
          return this ;
        } ;
        
        $context.follow = function ( event, $XHR, timeStamp ) {
          var setting = Store.settings[ 1 ] ;
          if ( !setting || !jQuery.when || !Store.check( event, setting ) ) { return false ; }
          if ( isFinite( event.timeStamp ) ) { $XHR.timeStamp = timeStamp || event.timeStamp ; }
          setting.xhr = $XHR ;
          jQuery.when( $XHR )
          .done( function () {
            setting.xhr && setting.xhr.readyState < 4 && setting.xhr.abort() ;
            jQuery[ Store.name ].setCache( event.currentTarget.href, undefined, undefined, $XHR ) ;
          } )
          .fail( function () {
            Store.fallback( event ) ;
          } ) ;
          jQuery[ Store.name ].click( event.currentTarget.href ) ;
          return true ;
        } ;
      }
      return $context ;
    },
    check: function ( event, setting ) {
      var src, dst ;
      src = jQuery( '<a/>', { href: Store.canonicalizeURL( window.location.href ) } )[ 0 ] ;
      dst = jQuery( '<a/>', { href: Store.canonicalizeURL( event.currentTarget.href ) } )[ 0 ] ;
      
      if ( !jQuery( event.currentTarget ).filter( setting.filter ).length ) { return ; }
      if ( setting.disable ) { return ; }
      
      if ( src.protocol !== dst.protocol || src.host !== dst.host ) { return ; }
      if ( event.which>1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ) { return ; }
      
      var url, cache ;
      
      url = dst.href ;
      setting.area = Store.fire( setting.areaback, null, [ event, setting.parameter, dst.href, src.href ] ) ;
      if ( !jQuery( setting.area ).length || setting.scope && !Store.scope( setting, src.href, dst.href ) ) { return ; }
      
      return true ;
    },
    supportPushState: function () {
      return 'pushState' in window.history && window.history[ 'pushState' ] ;
    },
    registrate: function ( jQuery, window, document, undefined, Store, setting ) {
      
      var context = this ;
      
      setting.id = 1 ;
      Store.ids.push( setting.id ) ;
      Store.settings[ setting.id ] = setting ;
      
      setting.load.script && jQuery( 'script' ).each( function () {
        var element = this, src ;
        element = typeof setting.load.rewrite === 'function' ? Store.fire( setting.load.rewrite, null, [ element.cloneNode() ] ) || element : element ;
        if ( ( src = element.src ) && src in setting.log.script ) { return ; }
        if ( src && ( !setting.load.reload || !jQuery( element ).is( setting.load.reload ) ) ) { setting.log.script[ src ] = true ; }
      } ) ;
      
      if ( setting.database ) {
        Store.database() ;
        
        setting.fix.scroll &&
        jQuery( window )
        .unbind( setting.nss.scroll )
        .bind( setting.nss.scroll, setting.id, function ( event, end ) {
          var setting = Store.settings[ 1 ] ;
          var id, fn = arguments.callee ;
          
          if ( !setting.scroll.delay ) {
            Store.dbScroll( jQuery( window ).scrollLeft(), jQuery( window ).scrollTop() ) ;
          } else {
            while ( id = setting.scroll.queue.shift() ) { clearTimeout( id ) ; }
            id = setTimeout( function () {
              while ( id = setting.scroll.queue.shift() ) { clearTimeout( id ) ; }
              Store.dbScroll( jQuery( window ).scrollLeft(), jQuery( window ).scrollTop() ) ;
            }, setting.scroll.delay ) ;
            setting.scroll.queue.push( id ) ;
          }
        } ) ;
      }
      
      setting.link &&
      jQuery( context )
      .undelegate( setting.link, setting.nss.click )
      .delegate( setting.link, setting.nss.click, setting.id, Store.click = function ( event ) {
        event.timeStamp = new Date().getTime() ;
        var setting = Store.settings[ 1 ] ;
        if ( !jQuery( this ).filter( setting.filter ).length ) { return ; }
        if ( setting.disable || event.isDefaultPrevented() ) { return ; }
        setting.location.href = Store.canonicalizeURL( window.location.href ) ;
        setting.destination.href = Store.canonicalizeURL( this.href ) ;
        
        if ( setting.location.protocol !== setting.destination.protocol || setting.location.host !== setting.destination.host ) { return ; }
        if ( event.which>1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ) { return ; }
        
        var url, cache ;
        
        url = setting.destination.href ;
        setting.area = Store.fire( setting.areaback, null, [ event, setting.parameter, setting.destination.href, setting.location.href ] ) ;
        setting.timeStamp = event.timeStamp ;
        if ( setting.landing ) { setting.landing = false ; }
        if ( !jQuery( setting.area ).length || setting.scope && !Store.scope( setting ) ) { return ; }
        setting.database && Store.dbScroll( jQuery( window ).scrollLeft(), jQuery( window ).scrollTop() ) ;
        
        if ( setting.cache[ event.type.toLowerCase() ] ) { cache = jQuery[ Store.name ].getCache( url ) ; }
        
        Store.drive( jQuery, window, document, undefined, Store, setting, event, url, true, cache ) ;
        return event.preventDefault() ;
      } ) ;
      
      setting.form &&
      jQuery( context )
      .undelegate( setting.form, setting.nss.submit )
      .delegate( setting.form, setting.nss.submit, setting.id, Store.submit = function ( event ) {
        event.timeStamp = new Date().getTime() ;
        var setting = Store.settings[ 1 ] ;
        if ( setting.disable || event.isDefaultPrevented() ) { return ; }
        setting.location.href = Store.canonicalizeURL( window.location.href ) ;
        setting.destination.href = Store.canonicalizeURL( this.action ) ;
        
        if ( setting.location.protocol !== setting.destination.protocol || setting.location.host !== setting.destination.host ) { return ; }
        if ( event.which>1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ) { return ; }
        
        var url, cache ;
        
        url = setting.destination.href = Store.canonicalizeURL( setting.destination.href.replace( /[?#].*/, '' ) + ( event.target.method.toUpperCase() === 'GET' ? '?' + jQuery( event.target ).serialize() : '' ) ) ;
        setting.area = Store.fire( setting.areaback, null, [ event, setting.parameter, setting.destination.href, setting.location.href ] ) ;
        setting.timeStamp = event.timeStamp ;
        if ( setting.landing ) { setting.landing = false ; }
        if ( !jQuery( setting.area ).length || setting.scope && !Store.scope( setting ) ) { return ; }
        setting.database && Store.dbScroll( jQuery( window ).scrollLeft(), jQuery( window ).scrollTop() ) ;
        
        if ( setting.cache[ event.type.toLowerCase() ] && setting.cache[ event.target.method.toLowerCase() ] ) { cache = jQuery[ Store.name ].getCache( url ) ; }
        
        Store.drive( jQuery, window, document, undefined, Store, setting, event, url, true, cache ) ;
        return event.preventDefault() ;
      } ) ;
      
      jQuery( window )
      .unbind( setting.nss.popstate )
      .bind( setting.nss.popstate, setting.id, Store.popstate = function ( event ) {
        event.timeStamp = new Date().getTime() ;
        var setting = Store.settings[ 1 ] ;
        if ( setting.disable || event.isDefaultPrevented() ) { return ; }
        //setting.location.href = Store.canonicalizeURL( window.location.href ) ;
        setting.destination.href = Store.canonicalizeURL( window.location.href ) ;
        
        if ( setting.location.href === setting.destination.href ) { return event.preventDefault() ; }
        
        var url, cache ;
        
        if ( setting.location.hash !== setting.destination.hash &&
             setting.location.pathname + setting.location.search === setting.destination.pathname + setting.destination.search &&
             !setting.hashquery ) {
          return event.preventDefault() ;
        }
        
        url = setting.destination.href ;
        setting.area = Store.fire( setting.areaback, null, [ event, setting.parameter, setting.destination.href, setting.location.href ] ) ;
        setting.timeStamp = event.timeStamp ;
        if ( setting.landing ) { if ( setting.landing.href === url ) { setting.landing = false ; return ; } setting.landing = false ; }
        if ( !jQuery( setting.area ).length ) { return ; }
        
        setting.database && setting.fix.history && Store.dbTitle( url ) ;
        if ( setting.cache[ event.type.toLowerCase() ] ) { cache = jQuery[ Store.name ].getCache( url ) ; }
        
        Store.drive( jQuery, window, document, undefined, Store, setting, event, url, false, cache ) ;
        return event.preventDefault() ;
      } ) ;
      
      ( function () {
        var DOMParser = window.DOMParser ;
        Store.parseHTML = function ( html ) { return DOMParser && DOMParser.prototype && ( new DOMParser() ).parseFromString( html, 'text/html' ) ; } ;
        if ( test( Store.parseHTML ) ) { return ; }
        
        Store.parseHTML = function( html ) {
          var doc ;
          if ( document.implementation && document.implementation.createHTMLDocument ) {
            doc = document.implementation.createHTMLDocument( '' ) ;
            if ( typeof doc.activeElement === 'object' ) {
              doc.open() ;
              doc.write( html ) ;
              doc.close() ;
            }
          }
          return doc ;
        } ;
        if ( test( Store.parseHTML ) ) { return ; }
        
        Store.parseHTML = false ;
        
        function test( parseHTML ) {
          try {
            var doc = parseHTML && parseHTML( '<body><noscript>DOMParser</noscript></body>' ) ;
            return jQuery( doc ).find( 'noscript' ).text() === 'DOMParser' ;
          } catch ( err ) {}
        }
      } )() ;
    },
    drive: function ( jQuery, window, document, undefined, Store, setting, event, url, register, cache ) {
      setting.scroll.record = false ;
      setting.fix.reset && /click|submit/.test( event.type.toLowerCase() ) && window.scrollTo( jQuery( window ).scrollLeft(), 0 ) ;
      if ( Store.fire( setting.callbacks.before, null, [ event, setting.parameter ], setting.callbacks.async ) === false ) { return ; } // function: drive
      
      jQuery[ Store.name ].off() ;
      
      if ( cache && cache.XMLHttpRequest ) {
        jQuery.when ? jQuery.when( Store.wait( Store.fire( setting.wait, null, [ event, setting.parameter, setting.destination.href, setting.location.href ] ) ) )
                      .done( function () { update( jQuery, window, document, undefined, Store, setting, event, cache ) ; } )
                    : update( jQuery, window, document, undefined, Store, setting, event, cache ) ;
        
      } else if ( setting.xhr && setting.xhr.promise ) {
        var wait = setting.wait && isFinite( setting.xhr.timeStamp ) ? Math.max( setting.wait - new Date().getTime() + setting.xhr.timeStamp, 0 ) : 0 ;
        jQuery.when( setting.xhr, Store.wait( wait ) )
        .done( function () { update( jQuery, window, document, undefined, Store, setting, event, jQuery[ Store.name ].getCache( url ) ) ; } ) ;
        
      } else {
        var ajax, callbacks, defer, data, XMLHttpRequest, textStatus, errorThrown, dataSize ;
        
        ajax = {} ;
        switch ( event.type.toLowerCase() ) {
          case 'click':
            ajax.type = 'GET' ;
            break ;
            
          case 'submit':
            ajax.type = event.target.method.toUpperCase() ;
            if ( ajax.type === 'POST' ) { ajax.data = jQuery( event.target ).serializeArray() ; }
            break ;
            
          case 'popstate':
            ajax.type = 'GET' ;
            break ;
        }
        
        defer = jQuery.when ? jQuery.Deferred() : null ;
        callbacks = {
          xhr: !setting.callbacks.ajax.xhr ? undefined : function () {
            XMLHttpRequest = Store.fire( setting.callbacks.ajax.xhr, this, [ event, setting.parameter ], setting.callbacks.async ) ;
            XMLHttpRequest = typeof XMLHttpRequest === 'object' && XMLHttpRequest || jQuery.ajaxSettings.xhr() ;
            
            //if ( XMLHttpRequest instanceof Object && XMLHttpRequest instanceof window.XMLHttpRequest && 'onprogress' in XMLHttpRequest ) {
            //  XMLHttpRequest.addEventListener( 'progress', function ( event ) { dataSize = event.loaded ; }, false ) ;
            //}
            return XMLHttpRequest ;
          },
          beforeSend: function () {
            XMLHttpRequest = arguments[ 0 ] ;
            
            setting.xhr && setting.xhr.readyState < 4 && setting.xhr.abort() ;
            setting.xhr = XMLHttpRequest ;
            
            XMLHttpRequest.setRequestHeader( setting.nss.requestHeader, 'true' ) ;
            XMLHttpRequest.setRequestHeader( setting.nss.requestHeader + '-Area', setting.area ) ;
            XMLHttpRequest.setRequestHeader( setting.nss.requestHeader + '-CSS', setting.load.css ) ;
            XMLHttpRequest.setRequestHeader( setting.nss.requestHeader + '-Script', setting.load.script ) ;
            
            Store.fire( setting.callbacks.ajax.beforeSend, this, [ event, setting.parameter, XMLHttpRequest, arguments[ 1 ] ], setting.callbacks.async ) ;
          },
          dataFilter: !setting.callbacks.ajax.dataFilter ? undefined : function () {
            data = arguments[ 0 ] ;
            
            return Store.fire( setting.callbacks.ajax.dataFilter, this, [ event, setting.parameter, data, arguments[ 1 ] ], setting.callbacks.async ) || data ;
          },
          success: function () {
            data = arguments[ 0 ] ;
            textStatus = arguments[ 1 ] ;
            XMLHttpRequest = arguments[ 2 ] ;
            
            Store.fire( setting.callbacks.ajax.success, this, [ event, setting.parameter, data, textStatus, XMLHttpRequest ], setting.callbacks.async ) ;
          },
          error: function () {
            XMLHttpRequest = arguments[ 0 ] ;
            textStatus = arguments[ 1 ] ;
            errorThrown = arguments[ 2 ] ;
            
            Store.fire( setting.callbacks.ajax.error, this, [ event, setting.parameter, XMLHttpRequest, textStatus, errorThrown ], setting.callbacks.async ) ;
          },
          complete: function () {
            XMLHttpRequest = arguments[ 0 ] ;
            textStatus = arguments[ 1 ] ;
            
            Store.fire( setting.callbacks.ajax.complete, this, [ event, setting.parameter, XMLHttpRequest, textStatus ], setting.callbacks.async ) ;
            
            if ( !errorThrown ) {
              defer && defer.resolve() || update( jQuery, window, document, undefined, Store, setting, event, cache ) ;
            } else {
              defer && defer.reject() ;
              if ( setting.fallback && textStatus !== 'abort' ) {
                return typeof setting.fallback === 'function' ? Store.fire( setting.fallback, null, [ event, setting.parameter, setting.destination.href, setting.location.href ] )
                                                              : Store.fallback( event ) ;
              }
            }
          }
        } ;
        jQuery.extend( true, ajax, setting.ajax, callbacks ) ;
        var query = setting.server.query ;
        if ( query ) {
          query = query.split( '=' ) ;
          query = encodeURIComponent( query[ 0 ] ) + ( query.length > 0 ? '=' + encodeURIComponent( query[ 1 ] ) : '' ) ;
        }
        ajax.url = url.replace( /([^#]+)(#[^\s]*)?$/, '$1' + ( query ? ( url.match( /\?/ ) ? '&' : '?' ) + query : '' ) + '$2' ) ;
        
        jQuery.when && jQuery.when( defer.promise(), Store.wait( Store.fire( setting.wait, null, [ event, setting.parameter, setting.destination.href, setting.location.href ] ) ) )
                       .done( function () { update( jQuery, window, document, undefined, Store, setting, event, cache ) ; } ) ;
        jQuery.ajax( ajax ) ;
      }
      
      jQuery[ Store.name ].on() ;
      
      if ( Store.fire( setting.callbacks.after, null, [ event, setting.parameter ], setting.callbacks.async ) === false ) { return ; } // function: drive
      
      
      function update( jQuery, window, document, undefined, Store, setting, event, cache ) {
        UPDATE: {
          var callbacks_update = setting.callbacks.update ;
          if ( Store.fire( callbacks_update.before, null, [ event, setting.parameter, data, textStatus, XMLHttpRequest, cache ], setting.callbacks.async ) === false ) { break UPDATE ; }
          
          /* variable initialization */
          var title, css, script ;
          
          try {
            setting.xhr && setting.xhr.readyState < 4 && setting.xhr.abort() ;
            setting.xhr = null ;
            if ( !cache && -1 === ( XMLHttpRequest.getResponseHeader( 'Content-Type' ) || '' ).toLowerCase().search( setting.contentType ) ) { throw new Error( "throw: content-type mismatch" ) ; }
            
            /* cache */
            UPDATE_CACHE: {
              if ( !cache ) { break UPDATE_CACHE ; }
              if ( Store.fire( callbacks_update.cache.load.before, null, [ event, setting.parameter, cache ], setting.callbacks.async ) === false ) { break UPDATE_CACHE ; }
              XMLHttpRequest = cache.XMLHttpRequest || XMLHttpRequest ;
              data = XMLHttpRequest.responseText ;
              textStatus = cache.textStatus || textStatus ;
              css = cache.css ;
              script = cache.script ;
              if ( Store.fire( callbacks_update.cache.load.after, null, [ event, setting.parameter, cache ], setting.callbacks.async ) === false ) { break UPDATE_CACHE ; }
            } ; // label: UPDATE_CACHE
            
            /* variable initialization */
            var pdoc, pdata, cdoc, cdata, parsable, areas, checker ;
            areas = setting.area.split( /\s*,\s*/ ) ;
            // Can not delete the script in the noscript After parse.
            pdata = ( XMLHttpRequest.responseText || '' ).replace( /<noscript[^>]*>(?:.|[\n\r])*?<\/noscript>/gim, function ( noscript ) {
              return noscript.replace( /<script(?:.|[\n\r])*?<\/script>/gim, '' ) ;
            } ) ;
            if ( cache && cache.data ) {
              cdata = cache.data ;
              cdoc = jQuery( Store.parseHTML && cdata && Store.parseHTML( cdata ) || cdata ) ;
              pdata = pdata.replace( /<title[^>]*?>([^<]*?)<\/title>/i, function ( title ) {
                return Store.find( cdata, /(<title[^>]*?>[^<]*?<\/title>)/i ).shift() || title ;
              }) ;
              pdoc = jQuery( Store.parseHTML && pdata && Store.parseHTML( pdata ) || pdata ) ;
              for ( var i = 0, area, element ; area = areas[ i++ ] ; ) {
                pdoc.find( area ).add( parsable ? '' : pdoc.filter( area ) ).html( cdoc.find( area ).add( parsable ? '' : cdoc.filter( area ) ).contents() ) ;
              }
            } else {
              pdoc = jQuery( Store.parseHTML && pdata && Store.parseHTML( pdata ) || pdata ) ;
            }
            
            switch ( true ) {
              case !!pdoc.find( 'html' )[ 0 ]:
                parsable = 1 ;
                pdoc.find( 'noscript' ).each( function () { this.children.length && jQuery( this ).text( this.innerHTML ) ; } ) ;
                break ;
              case !!pdoc.filter( 'title' )[ 0 ]:
                parsable = 0 ;
                break ;
              default:
                parsable = false ;
            }
            
            switch ( parsable ) {
              case 1:
                title = pdoc.find( 'title' ).text() ;
                break ;
              case 0:
                title = pdoc.filter( 'title' ).text() ;
                break ;
              case false:
                title = jQuery( '<span/>' ).html( Store.find( pdata, /<title[^>]*?>([^<]*?)<\/title>/i ).shift() ).text() ;
                break ;
            }
            
            if ( !jQuery( setting.area ).length || !pdoc.find( setting.area ).add( parsable ? '' : pdoc.filter( setting.area ) ).length ) { throw new Error( 'throw: area length mismatch' ) ; }
            jQuery( window ).trigger( setting.gns + '.unload' ) ;
            
            /* url */
            UPDATE_URL: {
              if ( Store.fire( callbacks_update.url.before, null, [ event, setting.parameter, data, textStatus, XMLHttpRequest ], setting.callbacks.async ) === false ) { break UPDATE_URL ; } ;
              
              register && url !== setting.location.href &&
              window.history.pushState(
                Store.fire( setting.state, null, [ event, setting.parameter, setting.destination.href, setting.location.href ] ),
                window.opera || window.navigator.userAgent.toLowerCase().indexOf( 'opera' ) !== -1 ? title : document.title,
                url ) ;
              
              setting.location.href = url ;
              if ( register && setting.fix.location ) {
                jQuery[ Store.name ].off() ;
                window.history.back() ;
                window.history.forward() ;
                jQuery[ Store.name ].on() ;
              }
              
              if ( Store.fire( callbacks_update.url.after, null, [ event, setting.parameter, data, textStatus, XMLHttpRequest ], setting.callbacks.async ) === false ) { break UPDATE_URL ; }
            } ; // label: UPDATE_URL
            
            /* title */
            UPDATE_TITLE: {
              if ( Store.fire( callbacks_update.title.before, null, [ event, setting.parameter, data, textStatus, XMLHttpRequest ], setting.callbacks.async ) === false ) { break UPDATE_TITLE ; }
              document.title = title ;
              setting.database && setting.fix.history && Store.dbTitle( url, title ) ;
              if ( Store.fire( callbacks_update.title.after, null, [ event, setting.parameter, data, textStatus, XMLHttpRequest ], setting.callbacks.async ) === false ) { break UPDATE_TITLE ; }
            } ; // label: UPDATE_TITLE
            
            setting.database && Store.dbCurrent() ;
            
            /* content */
            UPDATE_CONTENT: {
              if ( Store.fire( callbacks_update.content.before, null, [ event, setting.parameter, data, textStatus, XMLHttpRequest ], setting.callbacks.async ) === false ) { break UPDATE_CONTENT ; }
              jQuery( setting.area ).children( '.' + setting.nss.class4html + '-check' ).remove() ;
              checker = jQuery( '<div/>', {
                'class': setting.nss.class4html + '-check',
                'style': 'background: none !important; display: block !important; visibility: hidden !important; position: absolute !important; top: 0 !important; left: 0 !important; z-index: -9999 !important; width: auto !important; height: 0 !important; margin: 0 !important; padding: 0 !important; border: none !important; font-size: 12px !important; text-indent: 0 !important;'
              } ).text( setting.gns ) ;
              for ( var i = 0, area, element ; area = areas[ i++ ] ; ) {
                element = pdoc.find( area ).add( parsable ? '' : pdoc.filter( area ) ).clone().find( 'script' ).remove().end().contents() ;
                jQuery( area ).html( element ).append( checker.clone() ) ;
              }
              checker = jQuery( setting.area ).children( '.' + setting.nss.class4html + '-check' ) ;
              jQuery( document ).trigger( setting.gns + '.DOMContentLoaded' ) ;
              if ( Store.fire( callbacks_update.content.after, null, [ event, setting.parameter, data, textStatus, XMLHttpRequest ], setting.callbacks.async ) === false ) { break UPDATE_CONTENT ; }
            } ; // label: UPDATE_CONTENT
            
            /* scroll */
            function scroll( call ) {
              if ( Store.fire( callbacks_update.scroll.before, null, [ event, setting.parameter ], setting.callbacks.async ) === false ) { return ; }
              var scrollX, scrollY ;
              switch ( event.type.toLowerCase() ) {
                case 'click':
                case 'submit':
                  scrollX = call && typeof setting.scrollLeft === 'function' ? Store.fire( setting.scrollLeft, null, [ event, setting.parameter, setting.destination.href, setting.location.href ] ) : setting.scrollLeft ;
                  scrollX = 0 <= scrollX ? scrollX : 0 ;
                  scrollX = scrollX === false || scrollX === null ? jQuery( window ).scrollLeft() : parseInt( Number( scrollX ), 10 ) ;
                  
                  scrollY = call && typeof setting.scrollTop === 'function' ? Store.fire( setting.scrollTop, null, [ event, setting.parameter, setting.destination.href, setting.location.href ] ) : setting.scrollTop ;
                  scrollY = 0 <= scrollY ? scrollY : 0 ;
                  scrollY = scrollY === false || scrollY === null ? jQuery( window ).scrollTop() : parseInt( Number( scrollY ), 10 ) ;
                  
                  ( jQuery( window ).scrollTop() === scrollY && jQuery( window ).scrollLeft() === scrollX ) || window.scrollTo( scrollX, scrollY ) ;
                  call && setting.database && setting.fix.scroll && Store.dbScroll( scrollX, scrollY ) ;
                  break ;
                case 'popstate':
                  call && setting.database && setting.fix.scroll && Store.dbScroll() ;
                  break ;
              }
              if ( Store.fire( callbacks_update.scroll.after, null, [ event, setting.parameter ], setting.callbacks.async ) === false ) { return ; }
            } // function: scroll
            
            /* cache */
            UPDATE_CACHE: {
              if ( cache && cache.XMLHttpRequest || !setting.cache.click && !setting.cache.submit && !setting.cache.popstate ) { break UPDATE_CACHE ; }
              if ( event.type.toLowerCase() === 'submit' && !setting.cache[ event.target.method.toLowerCase() ] ) { break UPDATE_CACHE ; }
              if ( Store.fire( callbacks_update.cache.save.before, null, [ event, setting.parameter, cache ], setting.callbacks.async ) === false ) { break UPDATE_CACHE ; }
              
              jQuery[ Store.name ].setCache( url, cdata || null, textStatus, XMLHttpRequest ) ;
              cache = jQuery[ Store.name ].getCache( url ) ;
              
              if ( Store.fire( callbacks_update.cache.save.after, null, [ event, setting.parameter, cache ], setting.callbacks.async ) === false ) { break UPDATE_CACHE ; }
            } ; // label: UPDATE_CACHE
            
            /* rendering */
            function rendering( callback ) {
              if ( Store.fire( callbacks_update.rendering.before, null, [ event, setting.parameter ], setting.callbacks.async ) === false ) { return ; }
              
              var count = 0 ;
              ( function () {
                if ( checker.filter( function () { return this.clientWidth || this.clientHeight || jQuery( this ).is( ':hidden' ) ; } ).length === checker.length || count >= 100 ) {
                  
                  rendered( callback ) ;
                  
                } else if ( checker.length ) {
                  count++ ;
                  setTimeout( arguments.callee, setting.interval ) ;
                }
              } )() ;
            } // function: rendering
            function rendered( callback ) {
              checker.remove() ;
              setting.scroll.record = true ;
              Store.hashscroll( event.type.toLowerCase() === 'popstate' ) || scroll( true ) ;
              jQuery( window ).trigger( setting.gns + '.load' ) ;
              Store.fire( callback ) ;
              
              if ( Store.fire( callbacks_update.rendering.after, null, [ event, setting.parameter ], setting.callbacks.async ) === false ) { return ; }
            } // function: rendered
            
            /* escape */
            // Can not delete the style of update range in parsable === false.
            // However, there is no problem on real because parsable === false is not used.
            switch ( parsable ) {
              case 1:
              case 0:
                pdoc.find( 'noscript' ).remove() ;
                break ;
              case false:
                pdata = pdata.replace( /^(?:.|[\n\r])*<body[^>]*>.*[\n\r]*.*[\n\r]*/im, function ( head ) {
                  return head.replace( /<!--\[(?:.|[\n\r])*?<!\[endif\]-->/gim, '' ) ;
                } ) ;
                pdata = pdata.replace( /<noscript(?:.|[\n\r])*?<\/noscript>/gim, '' ) ;
                break ;
            }
            
            /* css */
            function load_css() {
              UPDATE_CSS: {
                if ( !setting.load.css ) { break UPDATE_CSS ; }
                if ( Store.fire( callbacks_update.css.before, null, [ event, setting.parameter, data, textStatus, XMLHttpRequest ], setting.callbacks.async ) === false ) { break UPDATE_CSS ; }
                
                var save, adds = [], removes = jQuery( 'link[rel~="stylesheet"], style' ) ;
                cache = jQuery[ Store.name ].getCache( url ) ;
                save = cache && !cache.css ;
                switch ( css || parsable ) {
                  case 1:
                  case 0:
                    css = pdoc.find( 'link[rel~="stylesheet"], style' ).add( parsable ? '' : pdoc.filter( 'link[rel~="stylesheet"], style' ) ).clone().get() ;
                    break ;
                  case false:
                    css = Store.find( pdata, /(<link[^>]*?rel=.[^"\']*?stylesheet[^>]*?>|<style[^>]*?>(?:.|[\n\r])*?<\/style>)/gim ) ;
                    break ;
                }
                css = jQuery( css ).not( setting.load.reject ) ;
                removes = removes.not( setting.load.reload ) ;
                
                if ( cache && cache.css && css && css.length !== cache.css.length ) { save = true ; }
                if ( save ) { cache.css = [] ; }
                
                for ( var i = 0, element, content ; element = css[ i ] ; i++ ) {
                  element = typeof element === 'object' ? save ? jQuery( element.outerHTML )[ 0 ] : element
                                                        : jQuery( element )[ 0 ] ;
                  element = typeof setting.load.rewrite === 'function' ? Store.fire( setting.load.rewrite, null, [ element.cloneNode() ] ) || element : element ;
                  if ( save ) { cache.css[ i ] = element ; }
                  
                  content = Store.trim( element.href || element.innerHTML || '' ) ;
                  
                  for ( var j = 0, tmp ; tmp = removes[ j ] ; j++ ) {
                    if ( !adds.length && Store.trim( tmp.href || tmp.innerHTML || '' ) === content ) {
                      removes = removes.not( tmp ) ;
                      element = null ;
                      break ;
                    } else if ( !j && adds.length ) {
                      break ;
                    }
                  }
                  element && adds.push( element ) ;
                }
                removes.remove() ;
                jQuery( 'head' ).append( adds ) ;
                
                if ( Store.fire( callbacks_update.css.after, null, [ event, setting.parameter, data, textStatus, XMLHttpRequest ], setting.callbacks.async ) === false ) { break UPDATE_CSS ; }
              } ; // label: UPDATE_CSS
            } // function: css
            
            /* script */
            function load_script( selector ) {
              UPDATE_SCRIPT: {
                if ( !setting.load.script ) { break UPDATE_SCRIPT ; }
                if ( Store.fire( callbacks_update.script.before, null, [ event, setting.parameter, data, textStatus, XMLHttpRequest ], setting.callbacks.async ) === false ) { break UPDATE_SCRIPT ; }
                
                var save ;
                cache = jQuery[ Store.name ].getCache( url ) ;
                save = cache && !cache.script ;
                switch ( script || parsable ) {
                  case 1:
                  case 0:
                    script = pdoc.find( 'script' ).add( parsable ? '' : pdoc.filter( 'script' ) ).clone().get() ;
                    break ;
                  case false:
                    script = Store.find( pdata, /(?:[^\'\"]|^\s*?)(<script[^>]*?>(?:.|[\n\r])*?<\/script>)(?:[^\'\"]|\s*?$)/gim ) ;
                    break ;
                }
                script = jQuery( script ).not( setting.load.reject ) ;
                
                if ( cache && cache.script && script && script.length !== cache.script.length ) { save = true ; }
                if ( save ) { cache.script = [] ; }
                
                for ( var i = 0, element, content ; element = script[ i ] ; i++ ) {
                  element = typeof element === 'object' ? save ? jQuery( element.outerHTML )[ 0 ] : element
                                                        : jQuery( element )[ 0 ] ;
                  element = typeof setting.load.rewrite === 'function' ? Store.fire( setting.load.rewrite, null, [ element.cloneNode() ] ) || element : element ;
                  if ( save ) { cache.script[ i ] = element ; }
                  
                  if ( !jQuery( element ).is( selector ) ) { continue ; }
                  content = Store.trim( element.src || '' ) ;
                  
                  if ( content && ( content in setting.log.script ) || setting.load.reject && jQuery( element ).is( setting.load.reject ) ) { continue ; }
                  if ( content && ( !setting.load.reload || !jQuery( element ).is( setting.load.reload ) ) ) { setting.log.script[ content ] = true ; }
                  
                  try {
                    if ( content ) {
                      jQuery.ajax( jQuery.extend( true, {}, setting.ajax, setting.load.ajax, { url: element.src, async: !!element.async, global: false } ) ) ;
                    } else {
                      typeof element === 'object' && ( !element.type || -1 !== element.type.toLowerCase().indexOf( 'text/javascript' ) ) &&
                      window.eval.call( window, ( element.text || element.textContent || element.innerHTML || '' ).replace( /^\s*<!(?:\[CDATA\[|\-\-)/, '/*$0*/' ) ) ;
                    }
                  } catch ( err ) {
                    break ;
                  }
                }
                
                if ( Store.fire( callbacks_update.script.after, null, [ event, setting.parameter, data, textStatus, XMLHttpRequest ], setting.callbacks.async ) === false ) { break UPDATE_SCRIPT ; }
              } ; // label: UPDATE_SCRIPT
            } // function: script
            
            /* verify */
            UPDATE_VERIFY: {
              if ( Store.fire( callbacks_update.verify.before, null, [ event, setting.parameter ], setting.callbacks.async ) === false ) { break UPDATE_VERIFY ; }
              if ( url === Store.canonicalizeURL( window.location.href ) ) {
                setting.retry = true ;
              } else if ( setting.retry ) {
                setting.retry = false ;
                Store.drive( jQuery, window, document, undefined, Store, setting, event, window.location.href, false, setting.cache[ event.type.toLowerCase() ] && jQuery[ Store.name ].getCache( Store.canonicalizeURL( window.location.href ) ) ) ;
              } else {
                throw new Error( 'throw: location mismatch' ) ;
              }
              if ( Store.fire( callbacks_update.verify.after, null, [ event, setting.parameter ], setting.callbacks.async ) === false ) { break UPDATE_VERIFY ; }
            } ; // label: UPDATE_VERIFY
            
            /* load */
            load_css() ;
            jQuery( window )
            .one( setting.gns + '.rendering', function ( event ) {
              event.preventDefault() ;
              event.stopImmediatePropagation() ;
              
              scroll( false ) ;
              jQuery( document ).trigger( setting.gns + '.ready' ) ;
              load_script( ':not([defer]), :not([src])' ) ;
              if ( setting.load.sync ) {
                rendering( function () { load_script( '[src][defer]' ) ; } ) ;
              } else {
                rendering() ;
                load_script( '[src][defer]' ) ;
              }
            } )
            .trigger( setting.gns + '.rendering' ) ;
            
            if ( Store.fire( callbacks_update.success, null, [ event, setting.parameter, data, textStatus, XMLHttpRequest ], setting.callbacks.async ) === false ) { break UPDATE ; }
            if ( Store.fire( callbacks_update.complete, null, [ event, setting.parameter, data, textStatus, XMLHttpRequest ], setting.callbacks.async ) === false ) { break UPDATE ; }
            if ( Store.fire( setting.callback, null, [ event, setting.parameter, data, textStatus, XMLHttpRequest ], setting.callbacks.async ) === false ) { break UPDATE ; }
          } catch( err ) {
            /* cache delete */
            cache && jQuery[ Store.name ].removeCache( url ) ;
            
            if ( Store.fire( callbacks_update.error, null, [ event, setting.parameter, data, textStatus, XMLHttpRequest ], setting.callbacks.async ) === false ) { break UPDATE ; }
            if ( Store.fire( callbacks_update.complete, null, [ event, setting.parameter, data, textStatus, XMLHttpRequest ], setting.callbacks.async ) === false ) { break UPDATE ; }
            if ( setting.fallback ) { return typeof setting.fallback === 'function' ? Store.fire( setting.fallback, null, [ event, setting.parameter, setting.destination.href, setting.location.href ] ) : Store.fallback( event ) ; }
          } ;
          
          if ( Store.fire( callbacks_update.after, null, [ event, setting.parameter, data, textStatus, XMLHttpRequest ], setting.callbacks.async ) === false ) { break UPDATE ; }
        } ; // label: UPDATE
      } // function: update
    },
    canonicalizeURL: function ( url ) {
      var ret ;
      // Trim
      ret = Store.trim( url ) ;
      // Remove string starting with an invalid character
      ret = ret.replace( /[<>"{}|\\^\[\]`\s].*/,'' ) ;
      // Deny value beginning with the string of HTTP (S) other than
      ret = /^https?:/i.test( ret ) ? ret : jQuery( '<a/>', { href: ret } )[0].href ;
      // Unify to UTF-8 encoded values
      ret = encodeURI( decodeURI( ret ) ) ;
      // Fix case
      ret = ret.replace( /(?:%\w{2})+/g, function ( str ) {
        return url.match( str.toLowerCase() ) || str ;
      } ) ;
      return ret ;
    },
    trim: function ( text ) {
      if ( String.prototype.trim ) {
        text = String( text ).trim() ;
      } else {
        if ( text = String( text ).replace( /^\s+/, '' ) ) {
          for ( var i = text.length ; --i ; ) {
            if ( /\S/.test( text.charAt( i ) ) ) {
              text = text.substring( 0, i + 1 ) ;
              break ;
            }
          }
        }
      }
      return text ;
    },
    fire: function ( fn, context, args, async ) {
      if ( typeof fn === 'function' ) { return async ? setTimeout( function () { fn.apply( context, args ) }, 0 ) : fn.apply( context, args ) ; } else { return fn ; }
    },
    hashscroll: function ( cancel ) {
      var setting = Store.settings[ 1 ] ;
      var hash = setting.destination.hash.slice( 1 ) ;
      cancel = cancel || !hash ;
      return !cancel && jQuery( '#' + ( hash ? hash : ', [name~=' + hash + ']' ) ).first().each( function () {
        isFinite( jQuery( this ).offset().top ) && window.scrollTo( jQuery( window ).scrollLeft(), parseInt( Number( jQuery( this ).offset().top ), 10 ) ) ;
      } ).length ;
    },
    wait: function ( ms ) {
      var defer = jQuery.Deferred() ;
      if ( !ms ) { return defer.resolve() ; }
      
      setTimeout( function () { defer.resolve() ; }, ms ) ;
      return defer.promise() ; // function: wait
    },
    fallback: function ( event ) {       
      switch ( event.type.toLowerCase() ) {
        case 'click':
          window.location.href = event.currentTarget.href ;
          break ;
        case 'submit':
          event.target.submit() ;
          break ;
        case 'popstate':
          window.location.reload() ;
          break ;
      }
    },
    find: function ( data, pattern ) {
      var result = [] ;
      data.replace( pattern, function () { result.push( arguments[ 1 ] ) ; } ) ;
      return result ;
    },
    scope: function ( setting, src, dst, relocation ) {
      var args, scp, arr, dirs, dir, keys, key, pattern, not, reg, rewrite, inherit, hit_src, hit_dst, option ;
      
      args = [].slice.call( arguments ) ;
      args.splice( 1, 1, src || setting.location.href ) ;
      args.splice( 2, 1, dst || setting.destination.href ) ;
      
      scp = setting.scope ;
      src = ( src || setting.location.href ).replace( /.+?\w(\/[^#?]*).*/, '$1' ) ;
      dst = ( dst || setting.destination.href ).replace( /.+?\w(\/[^#?]*).*/, '$1' ) ;
      
      arr = src.replace( /^\//, '' ).replace( /([?#])/g, '/$1' ).split( '/' ) ;
      keys = ( relocation || src ).replace( /^\//, '' ).replace( /([?#])/g, '/$1' ).split( '/' ) ;
      if ( relocation ) {
        if ( -1 === relocation.indexOf( '*' ) ) { return undefined ; }
        dirs = [] ;
        for ( var i = 0, len = keys.length ; i < len ; i++ ) { '*' === keys[ i ] && dirs.push( arr[ i ] ) ; }
      }
      
      for ( var i = keys.length + 1 ; i-- ; ) {
        rewrite = inherit = hit_src = hit_dst = undefined ;
        key = keys.slice( 0, i ).join( '/' ).replace( /\/([?#])/g, '$1' ) ;
        key = '/' + key + ( ( relocation || src ).charAt( key.length + 1 ) === '/' ? '/' : '' ) ;
        
        if ( !key || !( key in scp ) ) { continue ; }
        if ( !scp[ key ] || !scp[ key ].length ) { return false ; }
        
        for ( var j = 0 ; pattern = scp[ key ][ j ] ; j++ ) {
          if ( hit_src === false || hit_dst === false ) {
            break ;
          } else if ( pattern === 'rewrite' && typeof scp.rewrite === 'function' && !relocation ) {
            args.push( Store.fire( scp.rewrite, null, [ dst ] ) ) ;
            rewrite = arguments.callee.apply( this, args ) ;
            if ( rewrite ) {
              hit_src = hit_dst = true ;
              break ;
            } else if ( false === rewrite ) {
              return false ;
            }
          } else if ( pattern === 'inherit' ) {
            inherit = true ;
          } else if ( typeof pattern === 'string' ) {
            not = '^' === pattern.charAt( 0 ) ;
            pattern = not ? pattern.slice( 1 ) : pattern ;
            reg = '*' === pattern.charAt( 0 ) ;
            pattern = reg ? pattern.slice( 1 ) : pattern ;
            
            if ( relocation && -1 !== pattern.indexOf( '/*/' ) ) {
              for ( var k = 0, len = dirs.length ; k < len ; k++ ) { pattern = pattern.replace( '/*/', '/' + dirs[ k ] + '/' ) ; }
            }
            
            if ( ( not || !hit_src ) && ( reg ? !src.search( pattern ) : !src.indexOf( pattern ) ) ) {
              if ( not ) { return false ; } else { hit_src = true ; }
            }
            if ( ( not || !hit_dst ) && ( reg ? !dst.search( pattern ) : !dst.indexOf( pattern ) ) ) {
              if ( not ) { return false ; } else { hit_dst = true ; }
            }
          } else if ( typeof pattern === 'object' ) {
            option = pattern ;
          }
        }
        
        if ( hit_src && hit_dst ) {
          return jQuery.extend( true, {}, setting, ( typeof rewrite === 'object' ? rewrite : option ) || {} ) ;
        }
        if ( inherit ) { continue ; }
        break ;
      }
    },
    database: function ( count ) {
      var setting = Store.settings[ 1 ] ;
      var name, version, days, IDBFactory, IDBDatabase, IDBObjectStore ;
      name = setting.gns; 
      version = 1 ;
      days = Math.floor( new Date().getTime() / ( 1000*60*60*24 ) ) ;
      IDBFactory = Store.IDBFactory ;
      IDBDatabase = Store.IDBDatabase ;
      count = count || 0 ;
      
      setting.database = false ;
      if ( !IDBFactory || !name || count > 5 ) {
        return false ;
      }
      
      try {
        function retry( wait ) {
          Store.IDBDatabase = null ;
          IDBDatabase && IDBDatabase.close && IDBDatabase.close() ;
          IDBFactory.deleteDatabase( name ) ;
          wait ? setTimeout( function () { Store.database( ++count ) ; }, wait ) : Store.database( ++count ) ;
        }
        
        version = parseInt( days - days % 7 + version, 10 ) ;
        IDBDatabase = IDBFactory.open( name ) ;
        IDBDatabase.onblocked = function () {
        } ;
        IDBDatabase.onupgradeneeded = function () {
          var IDBDatabase = this.result ;
          try {
            for ( var i = IDBDatabase.objectStoreNames ? IDBDatabase.objectStoreNames.length : 0 ; i-- ; ) { IDBDatabase.deleteObjectStore( IDBDatabase.objectStoreNames[ i ] ) ; }
            IDBDatabase.createObjectStore( setting.gns, { keyPath: 'id', autoIncrement: false } ).createIndex( 'date', 'date', { unique: false } ) ;
          } catch ( err ) {
          }
        } ;
        IDBDatabase.onsuccess = function () {
          try {
            IDBDatabase = this.result ;
            Store.IDBDatabase = IDBDatabase ;
            if ( IDBObjectStore = Store.dbStore() ) {
              IDBObjectStore.get( '_version' ).onsuccess = function () {
                if ( !this.result || version === this.result.title ) {
                  Store.dbVersion( version ) ;
                  Store.dbCurrent() ;
                  Store.dbTitle( setting.location.href, document.title ) ;
                  Store.dbScroll( jQuery( window ).scrollLeft(), jQuery( window ).scrollTop() ) ;
                  
                  setting.database = true ;
                } else {
                  retry() ;
                }
              } ;
            } else {
              retry() ;
            }
          } catch ( err ) {
            retry( 1000 ) ;
          }
        } ;
        IDBDatabase.onerror = function ( event ) {
          retry( 1000 ) ;
        } ;
      } catch ( err ) {
        retry( 1000 ) ;
      }
    },
    dbStore: function () {
      var setting = Store.settings[ 1 ], IDBDatabase = Store.IDBDatabase ;
      for ( var i = IDBDatabase && IDBDatabase.objectStoreNames ? IDBDatabase.objectStoreNames.length : 0 ; i-- ; ) {
        if ( setting.gns === IDBDatabase.objectStoreNames[ i ] ) {
          return IDBDatabase && IDBDatabase.transaction && IDBDatabase.transaction( setting.gns, 'readwrite' ).objectStore( setting.gns ) ;
        }
      }
      return false ;
    },
    dbCurrent: function () {
      var setting = Store.settings[ 1 ], IDBObjectStore = Store.dbStore() ;
      
      if ( !IDBObjectStore ) { return ; }
      var url ;
      url = Store.canonicalizeURL( window.location.href ) ;
      url = setting.hashquery ? url : url.replace( /#.*/, '' ) ;
      IDBObjectStore.put( { id: '_current', title: url } ) ;
    },
    dbVersion: function ( version ) {
      var setting = Store.settings[ 1 ], IDBObjectStore = Store.dbStore() ;
      
      if ( !IDBObjectStore ) { return ; }
      IDBObjectStore.put( { id: '_version', title: version } ) ;
    },
    dbTitle: function ( url, title ) {
      var setting = Store.settings[ 1 ], IDBObjectStore = Store.dbStore() ;
      
      if ( !IDBObjectStore ) { return ; }
      url = setting.hashquery ? url : url.replace( /#.*/, '' ) ;
      if ( title ) {
        IDBObjectStore.get( url ).onsuccess = function () {
          IDBObjectStore.put( jQuery.extend( true, {}, this.result || {}, { id: url, title: title, date: new Date().getTime() } ) ) ;
          Store.dbClean() ;
        } ;
      } else {
        IDBObjectStore.get( url ).onsuccess = function () {
          this.result && this.result.title && ( document.title = this.result.title ) ;
        } ;
      }
    },
    dbScroll: function ( scrollX, scrollY ) {
      var setting = Store.settings[ 1 ], IDBObjectStore = Store.dbStore() ;
      var url = setting.location.href, title = document.title, len = arguments.length ;
      
      if ( !setting.scroll.record || !IDBObjectStore ) { return ; }
      url = setting.hashquery ? url : url.replace( /#.*/, '' ) ;
      IDBObjectStore.get( '_current' ).onsuccess = function () {
        if ( !this.result || !this.result.title || url !== this.result.title ) { return ; }
        if ( len ) {
          IDBObjectStore.get( url ).onsuccess = function () {
            IDBObjectStore.put( jQuery.extend( true, {}, this.result || {}, { scrollX: parseInt( Number( scrollX ), 10 ), scrollY: parseInt( Number( scrollY ), 10 ) } ) ) ;
          }
        } else {
          IDBObjectStore.get( url ).onsuccess = function () {
            this.result && isFinite( this.result.scrollX ) && isFinite( this.result.scrollY ) &&
            window.scrollTo( parseInt( Number( this.result.scrollX ), 10 ), parseInt( Number( this.result.scrollY ), 10 ) ) ;
          }
        }
      } ;
    },
    dbClean: function () {
      var setting = Store.settings[ 1 ], IDBObjectStore = Store.dbStore() ;
      IDBObjectStore.count().onsuccess = function () {
        if ( 1000 < this.result ) {
          IDBObjectStore.index( 'date' ).openCursor( Store.IDBKeyRange.upperBound( new Date().getTime() - ( 3*24*60*60*1000 ) ) ).onsuccess = function () {
            var IDBCursor = this.result ;
            if ( IDBCursor ) {
              IDBCursor[ 'delete' ]( IDBCursor.value.id ) ;
              IDBCursor[ 'continue' ]() ;
            } else {
              IDBObjectStore.count().onsuccess = function () { 1000 < this.result && IDBObjectStore.clear() ; }
            }
          }
        }
      } ;
    }
  } ;
  
  registrate.apply( this, [].slice.call( arguments ).concat( [ Store ] ) ) ;
} ) ( jQuery, window, document, void 0 ) ;
