/*
 * 
 * pjax
 * 
 * ---
 * @Copyright(c) 2012, falsandtru
 * @license MIT http://opensource.org/licenses/mit-license.php
 * @version 1.25.3
 * @updated 2013/11/21
 * @author falsandtru https://github.com/falsandtru/
 * @CodingConventions Google JavaScript Style Guide
 * ---
 * Note:
 * 
 * ---
 * Example:
 * @jquery 1.7.2
 * 
 * $.pjax( { area : 'div.pjax:not(.no-pjax)' } ) ;
 * 
 * ---
 * Document:
 * http://sa-kusaku.sakura.ne.jp/output/pjax/
 * 
 */

( function ( jQuery ) {
  
  var win = window, doc = document, undefined = void( 0 ), plugin_data = [ 'settings' ], plugin_store, plugin_response ;
  var DOMParser = win.DOMParser ;
  
  jQuery.fn.pjax = jQuery.pjax = function ( options ) {
    
    /* Transfer process */
    if ( typeof this === 'function' ) { return arguments.callee.apply( jQuery( doc ), arguments ) ; }
    
    /* validate */ var validate = window.validator instanceof Object ? window.validator : false ;
    /* validate */ validate = validate ? validator.clone( { name : 'jquery.pjax.js', base : true, timeout : { limit : options && options.ajax && options.ajax.timeout ? options.ajax.timeout + validate.timeout.limit : validate.timeout.limit } } ) : false ;
    /* validate */ validate && validate.start() ;
    /* validate */ validate && validate.test( '++', 1, options, 'pjax()' ) ;
    
    /* Variable initialization */
    /* validate */ validate && validate.test( '++', 1, 0, 'initialize' ) ;
    var defaults = {
          id : 0,
          gns : 'pjax',
          ns : null,
          area : null,
          link : 'a:not([target])',
          form : null,
          scope : null,
          state : null,
          scrollTop : 0,
          scrollLeft : 0,
          ajax : {},
          contentType : 'text/html',
          cache : {
            click : false, submit : false, popstate : false, get : true, post : true,
            length : 9 /* pages */, size : 1*1024*1024 /* 1MB */, expire : 30*60*1000 /* 30min */
          },
          callback : function () {},
          callbacks : {
            ajax : {},
            update : { url : {}, title : {}, content : {}, css : {}, script : {}, cache : { load : {}, save : {} }, rendering : {}, verify : {} },
            async : false
          },
          parameter : null,
          load : { css : false, script : false, execute : true, reload : null, reject : null, sync : true, ajax : { dataType : 'script' }, rewrite : null },
          interval : 300,
          wait : 0,
          scroll : { delay : 500, suspend : -100 },
          fix : { location : true, history : true, scroll : true, reset : false },
          hashquery : false,
          fallback : true,
          database : true,
          server : {},
          speedcheck : false
        },
        settings = jQuery.extend( true, {}, defaults, options ),
        nsArray = [ settings.gns ] ;
    
    /* validate */ validate && validate.test( '++', 1, settings, 'overwrite' ) ;
    jQuery.extend
    (
      true,
      settings,
      {
        nss : {
          pjax : nsArray.join( '.' ),
          click : [ 'click' ].concat( nsArray.join( ':' ) ).join( '.' ),
          submit : [ 'submit' ].concat( nsArray.join( ':' ) ).join( '.' ),
          popstate : [ 'popstate' ].concat( nsArray.join( ':' ) ).join( '.' ),
          scroll : [ 'scroll' ].concat( nsArray.join( ':' ) ).join( '.' ),
          data : nsArray.join( ':' ),
          class4html : nsArray.join( '-' ),
          requestHeader : [ 'X', nsArray[ 0 ].replace( /^\w/, function ( $0 ) { return $0.toUpperCase() ; } ) ].join( '-' ),
          array : nsArray
        },
        location : jQuery( '<a/>', { href : canonicalizeURL( win.location.href ) } )[ 0 ],
        destination : jQuery( '<a/>' )[ 0 ],
        fix : !/Mobile(\/\w+)? Safari/i.test( win.navigator.userAgent ) ? { location : false, reset : false } : {} ,
        contentType : settings.contentType.replace( /\s*[,;]\s*/g, '|' ).toLowerCase(),
        scroll : { record : true , queue : [] },
        database : settings.database ? ( win.indexedDB || win.webkitIndexedDB || win.mozIndexedDB || win.msIndexedDB || null ) : false,
        server : { query : !settings.server.query ? settings.gns : settings.server.query },
        log : { script : {}, speed : {} },
        history : { config : settings.cache, order : [], data : {}, size : 0 },
        timestamp : ( new Date() ).getTime(),
        disable : false,
        landing : canonicalizeURL( win.location.href ),
        retry : true,
        xhr : null,
        speed : { now : function () { return ( new Date() ).getTime() ; } },
        options : options,
        validate : validate
      }
    ) ;
    
    settings.id = 1 ;
    plugin_data[ settings.id ] = settings ;
    plugin_store = {} ;
    plugin_response = {
      on : on,
      off : off,
      click : click,
      submit : submit,
      setCache : setCache,
      getCache : getCache,
      clearCache : clearCache
    } ;
    jQuery.extend( true, jQuery.pjax, plugin_response ) ;
    
    /* Process startup */
    /* validate */ validate && validate.test( '++', 1, 0, 'register' ) ;
    if ( check() ) { share(), register( this ) ; }
    
    /* validate */ validate && validate.end() ;
    
    return plugin_response ; // function: pjax
    
    
    /* Function declaration */
    
    function check() {
      return supportPushState() && ( settings.area && ( settings.link || settings.form ) ) ;
    } // function: check
    
    function supportPushState() {
      return 'pushState' in win.history && win.history[ 'pushState' ] ;
    } // function: supportPushState
    
    function register( context ) {
      
      database() ;
      settings.load.script && jQuery( 'script' ).each( function () {
        var element = this, src ;
        element = typeof settings.load.rewrite === 'function' ? fire( settings.load.rewrite, null, [ element.cloneNode() ] ) || element : element ;
        if ( ( src = element.src ) && src in settings.log.script ) { return ; }
        if ( src && ( !settings.load.reload || !jQuery( element ).is( settings.load.reload ) ) ) { settings.log.script[ src ] = true ; }
      } ) ;
      
      jQuery( context )
      .undelegate( settings.link, settings.nss.click )
      .delegate( settings.link, settings.nss.click, settings.id, plugin_store.click = function ( event ) {
        event.timeStamp = ( new Date() ).getTime() ;
        var settings = plugin_data[ 1 ] ;
        if ( settings.disable || event.isDefaultPrevented() ) { return event.preventDefault() ; }
        settings.destination.href = canonicalizeURL( this.href ) ;
        
        if ( settings.location.protocol !== settings.destination.protocol || settings.location.host !== settings.destination.host ) { return ; }
        if ( event.which>1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ) { return ; }
        
        if ( !fire( settings.hashquery, null, [ event, this.href ] ) && settings.location.pathname + settings.location.search === settings.destination.pathname + settings.destination.search ) {
          return settings.destination.hash && hashscroll(), event.preventDefault() ;
        }
        
        var url, cache ;
        
        url = settings.destination.href ;
        settings.area = fire( settings.options.area, null, [ event, url ] ) ;
        settings.timestamp = event.timeStamp ;
        if ( settings.landing ) { settings.landing = false ; }
        if ( !jQuery( settings.area ).length || settings.scope && !scope( settings ) ) { return ; }
        
        if ( settings.cache[ event.type.toLowerCase() ] ) { cache = getCache( url ) ; }
        
        drive( settings, event, url, true, cache ) ;
        return event.preventDefault() ;
      } ) ;
      
      jQuery( context )
      .undelegate( settings.form, settings.nss.submit )
      .delegate( settings.form, settings.nss.submit, settings.id, plugin_store.submit = function ( event ) {
        event.timeStamp = ( new Date() ).getTime() ;
        var settings = plugin_data[ 1 ] ;
        if ( settings.disable || event.isDefaultPrevented() ) { return event.preventDefault() ; }
        settings.destination.href = canonicalizeURL( this.action ) ;
        
        if ( event.which>1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ) { return ; }
        
        var url, cache ;
        
        url = settings.destination.href = canonicalizeURL( settings.destination.href.replace( /[?#].*/, '' ) + ( event.target.method.toUpperCase() === 'GET' ? '?' + jQuery( event.target ).serialize() : '' ) ) ;
        settings.area = fire( settings.options.area, null, [ event, url ] ) ;
        settings.timestamp = event.timeStamp ;
        if ( settings.landing ) { settings.landing = false ; }
        if ( !jQuery( settings.area ).length || settings.scope && !scope( settings ) ) { return ; }
        
        if ( settings.cache[ event.type.toLowerCase() ] && settings.cache[ event.target.method.toLowerCase() ] ) { cache = getCache( url ) ; }
        
        drive( settings, event, url, true, cache ) ;
        return event.preventDefault() ;
      } ) ;
      
      jQuery( win )
      .unbind( settings.nss.popstate )
      .bind( settings.nss.popstate, settings.id, plugin_store.popstate = function ( event ) {
        event.timeStamp = ( new Date() ).getTime() ;
        var settings = plugin_data[ 1 ] ;
        if ( settings.disable || event.isDefaultPrevented() ) { return event.preventDefault() ; }
        settings.destination.href = canonicalizeURL( win.location.href ) ;
        
        if ( settings.location.href === settings.destination.href ) { return event.preventDefault() ; }
        
        var url, cache ;
        
        if ( !fire( settings.hashquery, null, [ event, url ] ) && settings.location.pathname + settings.location.search === settings.destination.pathname + settings.destination.search ) {
          return event.preventDefault() ;
        }
        
        url = settings.destination.href ;
        settings.area = fire( settings.options.area, null, [ event, url ] ) ;
        settings.timestamp = event.timeStamp ;
        if ( settings.landing ) { if ( settings.landing.href === url ) { settings.landing = false ; return ; } settings.landing = false ; }
        if ( !jQuery( settings.area ).length ) { return ; }
        
        settings.database && settings.fix.history && dbTitle( url ) ;
        if ( settings.cache[ event.type.toLowerCase() ] ) { cache = getCache( url ) ; }
        
        drive( settings, event, url, false, cache ) ;
        return event.preventDefault() ;
      } ) ;
      
      settings.database && settings.fix.scroll &&
      jQuery( win )
      .unbind( settings.nss.scroll )
      .bind( settings.nss.scroll, settings.id, function ( event, end ) {
        var settings = plugin_data[ 1 ] ;
        var id, fn = arguments.callee ;
        
        if ( !settings.scroll.delay ) {
          dbScroll( jQuery( win ).scrollLeft(), jQuery( win ).scrollTop() ) ;
        } else {
          while ( id = settings.scroll.queue.shift() ) { clearTimeout( id ) ; }
          id = setTimeout( function () {
            while ( id = settings.scroll.queue.shift() ) { clearTimeout( id ) ; }
            dbScroll( jQuery( win ).scrollLeft(), jQuery( win ).scrollTop() ) ;
          }, settings.scroll.delay ) ;
          
          settings.scroll.queue.push( id ) ;
        }
        
        if ( settings.scroll.suspend && !end ) {
          jQuery( this ).unbind( settings.nss.scroll ) ;
          setTimeout( function () {
            settings.database && settings.fix.scroll &&
            jQuery( win ).bind( settings.nss.scroll, settings.id, fn ).trigger( settings.nss.scroll, [ true ] ) ;
          }, settings.scroll.suspend ) ;
        }
        
      } ) ;
    } // function: register
    
    function drive( settings, event, url, register, cache ) {
      /* validate */ var validate = settings.validate ? settings.validate.clone( { name : 'jquery.pjax.js - drive()' } ) : false ;
      /* validate */ validate && validate.start() ;
      /* validate */ validate && ( validate.scope = function( code ){ return eval( code ) ; } ) ;
      /* validate */ validate && validate.test( '++', 1, [ url, event.type ], 'drive()' ) ;
      
      var speedcheck = settings.speedcheck ;
      speedcheck && ( settings.log.speed.fire = settings.timestamp ) ;
      speedcheck && ( settings.log.speed.time = [] ) ;
      speedcheck && ( settings.log.speed.name = [] ) ;
      speedcheck && settings.log.speed.name.push( 'fire' ) ;
      speedcheck && settings.log.speed.time.push( settings.speed.now() - settings.log.speed.fire ) ;
      
      /* validate */ validate && validate.test( '++', 1, 0, 'start' ) ;
      settings.scroll.record = false ;
      settings.fix.reset && /click|submit/.test( event.type.toLowerCase() ) && win.scrollTo( jQuery( win ).scrollLeft(), 0 ) ;
      if ( fire( settings.callbacks.before, null, [ event, settings.parameter ], settings.callbacks.async ) === false ) { return ; } // function: drive
      
      if ( cache ) {
        /* validate */ validate && validate.test( '++', 1, 0, 'update' ) ;
        jQuery.when ? jQuery.when( wait( settings.wait ) ).done( function () { update( settings, event, cache ) ; } ) : update( settings, event, cache ) ;
        /* validate */ validate && validate.test( '++', 1, 0, 'end' ) ;
        /* validate */ validate && validate.end() ;
        return ;
      }
      
      /* validate */ validate && validate.test( '++', 1, 0, 'initialize' ) ;
      var ajax, callbacks, defer, data, XMLHttpRequest, textStatus, errorThrown, dataSize ;
      
      ajax = {} ;
      switch ( event.type.toLowerCase() ) {
        case 'click' :
          /* validate */ validate && validate.test( '++', 1, 0, 'event click' ) ;
          ajax.type = 'GET' ;
          break ;
          
        case 'submit' :
          /* validate */ validate && validate.test( '++', 1, event.target.method, 'event submit' ) ;
          ajax.type = event.target.method.toUpperCase() ;
          if ( ajax.type === 'POST' ) { ajax.data = jQuery( event.target ).serializeArray() ; }
          break ;
          
        case 'popstate' :
          /* validate */ validate && validate.test( '++', 1, 0, 'event popstate' ) ;
          ajax.type = 'GET' ;
          break ;
      }
      
      defer = jQuery.when ? jQuery.Deferred() : null ;
      /* validate */ validate && validate.test( '++', 1, 0, 'setting' ) ;
      callbacks = {
        xhr : !settings.callbacks.ajax.xhr ? undefined : function () {
          XMLHttpRequest = fire( settings.callbacks.ajax.xhr, null, [ event, settings.parameter ], settings.callbacks.async ) ;
          XMLHttpRequest = typeof XMLHttpRequest === 'object' && XMLHttpRequest || jQuery.ajaxSettings.xhr() ;
          
          //if ( XMLHttpRequest instanceof Object && XMLHttpRequest instanceof win.XMLHttpRequest && 'onprogress' in XMLHttpRequest ) {
          //  XMLHttpRequest.addEventListener( 'progress', function ( event ) { dataSize = event.loaded ; }, false ) ;
          //}
          return XMLHttpRequest ;
        },
        beforeSend : function () {
          XMLHttpRequest = arguments[ 0 ] ;
          
          settings.xhr && settings.xhr.readyState < 4 && settings.xhr.abort() ;
          settings.xhr = XMLHttpRequest ;
          
          XMLHttpRequest.setRequestHeader( settings.nss.requestHeader, 'true' ) ;
          XMLHttpRequest.setRequestHeader( settings.nss.requestHeader + '-Area', settings.area ) ;
          XMLHttpRequest.setRequestHeader( settings.nss.requestHeader + '-CSS', settings.load.css ) ;
          XMLHttpRequest.setRequestHeader( settings.nss.requestHeader + '-Script', settings.load.script ) ;
          
          fire( settings.callbacks.ajax.beforeSend, null, [ event, settings.parameter, XMLHttpRequest, arguments[ 1 ] ], settings.callbacks.async ) ;
        },
        dataFilter : !settings.callbacks.ajax.dataFilter ? undefined : function () {
          data = arguments[ 0 ] ;
          
          return fire( settings.callbacks.ajax.dataFilter, null, [ event, settings.parameter, data, arguments[ 1 ] ], settings.callbacks.async ) || data ;
        },
        success : function () {
          data = arguments[ 0 ] ;
          textStatus = arguments[ 1 ] ;
          XMLHttpRequest = arguments[ 2 ] ;
          
          /* validate */ validate = settings.validate ? settings.validate.clone( { name : 'jquery.pjax.js - $.ajax()' } ) : false ;
          /* validate */ validate && validate.start() ;
          /* validate */ validate && validate.test( '++', textStatus === 'success', [ url, settings.location.href, XMLHttpRequest, textStatus ], 'ajax success' ) ;
          fire( settings.callbacks.ajax.success, null, [ event, settings.parameter, data, textStatus, XMLHttpRequest ], settings.callbacks.async ) ;
        },
        error : function () {
          XMLHttpRequest = arguments[ 0 ] ;
          textStatus = arguments[ 1 ] ;
          errorThrown = arguments[ 2 ] ;
          
          /* validate */ validate = settings.validate ? settings.validate.clone( { name : 'jquery.pjax.js - $.ajax()' } ) : false ;
          /* validate */ validate && validate.start() ;
          /* validate */ validate && validate.test( '++', textStatus === 'abort', [ url, settings.location.href, XMLHttpRequest, textStatus, errorThrown ], 'ajax error' ) ;
          fire( settings.callbacks.ajax.error, null, [ event, settings.parameter, XMLHttpRequest, textStatus, errorThrown ], settings.callbacks.async ) ;
        },
        complete : function () {
          XMLHttpRequest = arguments[ 0 ] ;
          textStatus = arguments[ 1 ] ;
          
          /* validate */ validate && validate.test( '++', 1, 0, 'ajax complete' ) ;
          fire( settings.callbacks.ajax.complete, null, [ event, settings.parameter, XMLHttpRequest, textStatus ], settings.callbacks.async ) ;
          
          if ( !errorThrown ) {
            defer && defer.resolve() || update( settings, event ) ;
          } else {
            defer && defer.reject() ;
            if ( settings.fallback && textStatus !== 'abort' ) { return typeof settings.fallback === 'function' ? fire( settings.fallback, null, [ event, url ] ) : fallback( event, validate ) ; }
          }
          /* validate */ validate && validate.end() ;
        }
      } ;
      jQuery.extend( true, ajax, settings.ajax, callbacks ) ;
      ajax.url = url.replace( /([^#]+)(#[^\s]*)?$/, '$1' + ( settings.server.query ? ( url.match( /\?/ ) ? '&' : '?' ) + encodeURIComponent( settings.server.query ) + '=1' : '' ) + '$2' ) ;
      
      /* validate */ validate && validate.test( '++', 1, 0, 'ajax' ) ;
      speedcheck && settings.log.speed.name.push( 'request' ) ;
      speedcheck && settings.log.speed.time.push( settings.speed.now() - settings.log.speed.fire ) ;
      jQuery.when && jQuery.when( defer.promise(), wait( settings.wait ) ).done( function () { update( settings, event ) ; } ) ;
      jQuery.ajax( ajax ) ;
      
      if ( fire( settings.callbacks.after, null, [ event, settings.parameter ], settings.callbacks.async ) === false ) { return ; } // function: drive
      /* validate */ validate && validate.test( '++', 1, 0, 'end' ) ;
      /* validate */ validate && validate.end() ;
      
      
      function update( settings, event, cache ) {
        /* validate */ var validate = settings.validate ? settings.validate.clone( { name : 'jquery.pjax.js - update()' } ) : false ;
        /* validate */ validate && validate.start() ;
        /* validate */ validate && ( validate.scope = function( code ){ return eval( code ) ; } ) ;
        /* validate */ validate && validate.test( '1', 1, 0, 'update()' ) ;
        /* validate */ validate && validate.test( '++', 1, 0, 'start' ) ;
        UPDATE : {
          var speedcheck = settings.speedcheck ;
          speedcheck && settings.log.speed.name.push( 'update' ) ;
          speedcheck && settings.log.speed.time.push( settings.speed.now() - settings.log.speed.fire ) ;
          
          var callbacks_update = settings.callbacks.update ;
          if ( fire( callbacks_update.before, null, [ event, settings.parameter, data, textStatus, XMLHttpRequest ], settings.callbacks.async ) === false ) { break UPDATE ; }
          
          /* variable initialization */
          var win = window, doc = document, title, css, script ;
          
          try {
            
            /* validate */ validate && validate.test( '++', 1, 0, 'try' ) ;
            /* validate */ validate && validate.test( '++', 1, !cache ? [ settings.contentType, XMLHttpRequest.getResponseHeader( 'Content-Type' ) ] : 0, 'content-type' ) ;
            if ( !cache && -1 === ( XMLHttpRequest.getResponseHeader( 'Content-Type' ) || '' ).toLowerCase().search( settings.contentType ) ) { throw new Error( "throw: content-type mismatch" ) ; }
            
            /* cache */
            /* validate */ validate && validate.test( '++', cache ? "'usable'" : "'unusable'", 0, 'cache' ) ;
            UPDATE_CACHE : {
              if ( !cache ) { break UPDATE_CACHE ; }
              if ( fire( callbacks_update.cache.load.before, null, [ event, settings.parameter, cache ], settings.callbacks.async ) === false ) { break UPDATE_CACHE ; }
              XMLHttpRequest = cache.XMLHttpRequest ;
              data = XMLHttpRequest.responseText ;
              textStatus = cache.textStatus ;
              title = cache.title ;
              css = cache.css ;
              script = cache.script ;
              if ( fire( callbacks_update.cache.load.after, null, [ event, settings.parameter, cache ], settings.callbacks.async ) === false ) { break UPDATE_CACHE ; }
            } ; // label: UPDATE_CACHE
            
            /* variable initialization */
            /* validate */ validate && validate.test( '++', 1, 0, 'initialize' ) ;
            var pdoc, pdata, parsable, areas, checker ;
            // Can not delete the script in the noscript After parse.
            pdata = ( XMLHttpRequest.responseText || '' ).replace( /<noscript[^>]*>(?:.|[\n\r])*?<\/noscript>/gim, function ( noscript ) {
              return noscript.replace( /<script(?:.|[\n\r])*?<\/script>/gim, '' ) ;
            } ) ;
            pdoc = jQuery( pdata && DOMParser && !win.opera && win.navigator.userAgent.toLowerCase().indexOf( 'opera' ) === -1 && ( new DOMParser ).parseFromString( pdata, 'text/html' ) ||
                           pdata ||
                           XMLHttpRequest.responseXML ) ;
            areas = settings.area.split( /\s*,\s*/ ) ;
            
            switch ( true ) {
              case !!pdoc.find( 'html' )[ 0 ] :
                parsable = 1 ;
                pdoc.find( 'noscript' ).each( function () { this.children.length && jQuery( this ).text( this.innerHTML ) ; } ) ;
                break ;
              case !!pdoc.filter( 'title' )[ 0 ] :
                parsable = 0 ;
                break ;
              default :
                parsable = false ;
            }
            
            switch ( parsable ) {
              case 1 :
                title = pdoc.find( 'title' ).text() ;
                break ;
              case 0 :
                title = pdoc.filter( 'title' ).text() ;
                break ;
              case false :
                title = jQuery( '<span/>' ).html( find( pdata, /<title>([^<]*?)<\/title>/i ).join() ).text() ;
                break ;
            }
            
            if ( !jQuery( settings.area ).length || !pdoc.find( settings.area ).add( parsable ? '' : pdoc.filter( settings.area ) ).length ) { throw new Error( 'throw: area length mismatch' ) ; }
            
            /* url */
            /* validate */ validate && validate.test( '++', 1, url, 'url' ) ;
            UPDATE_URL : {
              if ( fire( callbacks_update.url.before, null, [ event, settings.parameter, data, textStatus, XMLHttpRequest ], settings.callbacks.async ) === false ) { break UPDATE_URL ; } ;
              
              register && url !== settings.location.href &&
              win.history.pushState(
                fire( settings.state, null, [ event, url ] ),
                win.opera || win.navigator.userAgent.toLowerCase().indexOf( 'opera' ) !== -1 ? title : doc.title,
                url ) ;
              
              settings.location.href = url ;
              if ( register && settings.fix.location ) {
                plugin_response.off() ;
                win.history.back() ;
                win.history.forward() ;
                plugin_response.on() ;
              }
              
              if ( fire( callbacks_update.url.after, null, [ event, settings.parameter, data, textStatus, XMLHttpRequest ], settings.callbacks.async ) === false ) { break UPDATE_URL ; }
            } ; // label: UPDATE_URL
            
            /* title */
            /* validate */ validate && validate.test( '++', 1, title, 'title' ) ;
            UPDATE_TITLE : {
              if ( fire( callbacks_update.title.before, null, [ event, settings.parameter, data, textStatus, XMLHttpRequest ], settings.callbacks.async ) === false ) { break UPDATE_TITLE ; }
              doc.title = title ;
              settings.database && settings.fix.history && dbTitle( url, title ) ;
              if ( fire( callbacks_update.title.after, null, [ event, settings.parameter, data, textStatus, XMLHttpRequest ], settings.callbacks.async ) === false ) { break UPDATE_TITLE ; }
            } ; // label: UPDATE_TITLE
            
            settings.database && dbCurrent() ;
            
            /* scroll */
            /* validate */ validate && validate.test( '++', 1, 0, 'scroll' ) ;
            function scroll( call ) {
              var scrollX, scrollY ;
              switch ( event.type.toLowerCase() ) {
                case 'click' :
                case 'submit' :
                  scrollX = call && typeof settings.scrollLeft === 'function' ? fire( settings.scrollLeft, null, [ event ] ) : settings.scrollLeft ;
                  scrollX = 0 <= scrollX ? scrollX : 0 ;
                  scrollX = scrollX === null ? jQuery( win ).scrollLeft() : parseInt( Number( scrollX ), 10 ) ;
                  
                  scrollY = call && typeof settings.scrollTop === 'function' ? fire( settings.scrollTop, null, [ event ] ) : settings.scrollTop ;
                  scrollY = 0 <= scrollY ? scrollY : 0 ;
                  scrollY = scrollY === null ? jQuery( win ).scrollTop() : parseInt( Number( scrollY ), 10 ) ;
                  
                  ( jQuery( win ).scrollTop() === scrollY && jQuery( win ).scrollLeft() === scrollX ) || win.scrollTo( scrollX, scrollY ) ;
                  call && settings.database && settings.fix.scroll && dbScroll( scrollX, scrollY ) ;
                  break ;
                case 'popstate' :
                  call && settings.database && settings.fix.scroll && dbScroll() ;
                  break ;
              }
            } // function: scroll
            scroll( false ) ;
            
            /* content */
            /* validate */ validate && validate.test( '++', 1, areas, 'content' ) ;
            UPDATE_CONTENT : {
              if ( fire( callbacks_update.content.before, null, [ event, settings.parameter, data, textStatus, XMLHttpRequest ], settings.callbacks.async ) === false ) { break UPDATE_CONTENT ; }
              jQuery( settings.area ).children( '.' + settings.nss.class4html + '-check' ).remove() ;
              checker = jQuery( '<div/>', {
                'class' : settings.nss.class4html + '-check',
                'style' : 'background: none !important; display: block !important; visibility: hidden !important; position: absolute !important; top: 0 !important; left: 0 !important; z-index: -9999 !important; width: auto !important; height: 0 !important; margin: 0 !important; padding: 0 !important; border: none !important; font-size: 12px !important; text-indent: 0 !important;'
              } ).text( settings.gns ) ;
              for ( var i = 0, area, element ; area = areas[ i++ ] ; ) {
                element = pdoc.find( area ).add( parsable ? '' : pdoc.filter( area ) ).clone().find( 'script' ).remove().end().contents() ;
                jQuery( area ).html( element ).append( checker.clone() ) ;
              }
              checker = jQuery( settings.area ).children( '.' + settings.nss.class4html + '-check' ) ;
              jQuery( doc ).trigger( settings.gns + '.DOMContentLoaded' ) ;
              if ( fire( callbacks_update.content.after, null, [ event, settings.parameter, data, textStatus, XMLHttpRequest ], settings.callbacks.async ) === false ) { break UPDATE_CONTENT ; }
            } ; // label: UPDATE_CONTENT
            speedcheck && settings.log.speed.name.push( 'content' ) ;
            speedcheck && settings.log.speed.time.push( settings.speed.now() - settings.log.speed.fire ) ;
            
            /* cache */
            /* validate */ validate && validate.test( '++', 1, 0, 'cache' ) ;
            UPDATE_CACHE : {
              if ( cache || !settings.cache.click && !settings.cache.submit && !settings.cache.popstate ) { break UPDATE_CACHE ; }
              if ( event.type.toLowerCase() === 'submit' && !settings.cache[ event.target.method.toLowerCase() ] ) { break UPDATE_CACHE ; }
              if ( fire( callbacks_update.cache.save.before, null, [ event, settings.parameter, cache ], settings.callbacks.async ) === false ) { break UPDATE_CACHE ; }
              
              setCache( url, title, dataSize, textStatus, XMLHttpRequest ) ;
              cahce = getCache( url ) ;
              
              if ( fire( callbacks_update.cache.save.after, null, [ event, settings.parameter, cache ], settings.callbacks.async ) === false ) { break UPDATE_CACHE ; }
            } ; // label: UPDATE_CACHE
            
            /* rendering */
            /* validate */ validate && validate.test( '++', 1, 0, 'rendering' ) ;
            function rendering( call ) {
              if ( fire( callbacks_update.rendering.before, null, [ event, settings.parameter ], settings.callbacks.async ) === false ) { return ; }
              ( function () {
                if ( checker.filter( function () { return this.clientWidth || jQuery( this ).is( ':hidden' ) ; } ).length === checker.length ) {
                  
                  rendered( call ) ;
                  
                } else if ( checker.length ) {
                  setTimeout( function () { arguments.callee() ; }, settings.interval ) ;
                }
              } )() ;
            } // function: rendering
            function rendered( call ) {
              checker.remove() ;
              if ( call ) {
                settings.load.sync && load_script( '[src][defer]' ) ;
              } else {
                settings.scroll.record = true ;
                hashscroll( event.type.toLowerCase() === 'popstate' ) || scroll( true ) ;
                jQuery( win ).trigger( settings.gns + '.load' ) ;
                
                speedcheck && settings.log.speed.name.push( 'rendered' ) ;
                speedcheck && settings.log.speed.time.push( settings.speed.now() - settings.log.speed.fire ) ;
              }
              if ( fire( callbacks_update.rendering.after, null, [ event, settings.parameter ], settings.callbacks.async ) === false ) { return ; }
            } // function: rendered
            
            /* escape */
            /* validate */ validate && validate.test( '++', 1, 0, 'escape' ) ;
            // Can not delete the style of update range in parsable === false.
            // However, there is no problem on real because parsable === false is not used.
            switch ( parsable ) {
              case 1 :
              case 0 :
                pdoc.find( settings.area ).remove() ;
                pdoc.find( 'noscript' ).find( 'link[rel~="stylesheet"], style' ).remove() ;
                break ;
              case false :
                pdata = pdata.replace( /^(?:.|[\n\r])*<body[^>]*>.*[\n\r]*.*[\n\r]*/im, function ( head ) {
                  return head.replace( /<!--\[(?:.|[\n\r])*?<!\[endif\]-->/gim, '' ) ;
                } ) ;
                pdata = pdata.replace( /<noscript(?:.|[\n\r])*?<\/noscript>/gim, '' ) ;
                break ;
            }
            
            /* css */
            /* validate */ validate && validate.test( '++', 1, 0, 'css' ) ;
            function load_css() {
              /* validate */ var validate = settings.validate ? settings.validate.clone( { name : 'jquery.pjax.js - load_css()' } ) : false ;
              /* validate */ validate && validate.start() ;
              /* validate */ validate && ( validate.scope = function( code ){ return eval( code ) ; } ) ;
              UPDATE_CSS : {
                if ( !settings.load.css ) { break UPDATE_CSS ; }
                if ( fire( callbacks_update.css.before, null, [ event, settings.parameter, data, textStatus, XMLHttpRequest ], settings.callbacks.async ) === false ) { break UPDATE_CSS ; }
                
                var save, adds = [], removes = jQuery( 'link[rel~="stylesheet"], style' ).not( jQuery( settings.area ).find( 'link[rel~="stylesheet"], style' ) ) ;
                cache = getCache( url ) ;
                save = cache && !cache.css ;
                switch ( css || parsable ) {
                  case 1 :
                  case 0 :
                    css = pdoc.find( 'link[rel~="stylesheet"], style' ).add( parsable ? '' : pdoc.filter( 'link[rel~="stylesheet"], style' ) ).clone().get() ;
                    break ;
                  case false :
                    css = find( pdata, /(<link[^>]*?rel=.[^"\']*?stylesheet[^>]*?>|<style[^>]*?>(?:.|[\n\r])*?<\/style>)/gim ) ;
                    break ;
                }
                if ( cache && cache.css && css && css.length !== cache.css.length ) { save = true ; }
                if ( save ) { cache.css = [] ; }
                
                for ( var i = 0, element, content ; element = css[ i ] ; i++ ) {
                  
                  element = typeof element === 'object' ? element : jQuery( element )[ 0 ] ;
                  element = typeof settings.load.rewrite === 'function' ? fire( settings.load.rewrite, null, [ element.cloneNode() ] ) || element : element ;
                  if ( save ) { cache.css[ i ] = element ; }
                  
                  content = trim( element.href || element.innerHTML || '' ) ;
                  
                  for ( var j = 0, tmp ; tmp = removes[ j ] ; j++ ) {
                    if ( trim( tmp.href || tmp.innerHTML || '' ) === content ) {
                      removes = removes.not( tmp ) ;
                      element = null ;
                      break ;
                    }
                  }
                  element && adds.push( element ) ;
                }
                removes.remove() ;
                jQuery( 'head' ).append( adds ) ;
                
                if ( fire( callbacks_update.css.after, null, [ event, settings.parameter, data, textStatus, XMLHttpRequest ], settings.callbacks.async ) === false ) { break UPDATE_CSS ; }
                
                speedcheck && settings.log.speed.name.push( 'css' ) ;
                speedcheck && settings.log.speed.time.push( settings.speed.now() - settings.log.speed.fire ) ;
              } ; // label: UPDATE_CSS
              /* validate */ validate && validate.end() ;
            } // function: css
            
            /* script */
            /* validate */ validate && validate.test( '++', 1, 0, 'script' ) ;
            function load_script( selector ) {
              /* validate */ var validate = settings.validate ? settings.validate.clone( { name : 'jquery.pjax.js - load_script()' } ) : false ;
              /* validate */ validate && validate.start() ;
              /* validate */ validate && ( validate.scope = function( code ){ return eval( code ) ; } ) ;
              UPDATE_SCRIPT : {
                if ( !settings.load.script ) { break UPDATE_SCRIPT ; }
                if ( fire( callbacks_update.script.before, null, [ event, settings.parameter, data, textStatus, XMLHttpRequest ], settings.callbacks.async ) === false ) { break UPDATE_SCRIPT ; }
                
                var save ;
                cache = getCache( url ) ;
                save = cache && !cache.script ;
                switch ( script || parsable ) {
                  case 1 :
                  case 0 :
                    script = pdoc.find( 'script' ).add( parsable ? '' : pdoc.filter( 'script' ) ).clone().get() ;
                    break ;
                  case false :
                    script = find( pdata, /(?:[^\'\"]|^\s*?)(<script[^>]*?>(?:.|[\n\r])*?<\/script>)(?:[^\'\"]|\s*?$)/gim ) ;
                    break ;
                }
                if ( cache && cache.script && script && script.length !== cache.script.length ) { save = true ; }
                if ( save ) { cache.script = [] ; }
                
                for ( var i = 0, element, content ; element = script[ i ] ; i++ ) {
                  
                  element = typeof element === 'object' ? element : jQuery( element )[ 0 ] ;
                  element = typeof settings.load.rewrite === 'function' ? fire( settings.load.rewrite, null, [ element.cloneNode() ] ) || element : element ;
                  if ( save ) { cache.script[ i ] = element ; }
                  
                  if ( !jQuery( element ).is( selector ) ) { continue ; }
                  content = trim( element.src || '' ) ;
                  
                  if ( content && ( content in settings.log.script ) || settings.load.reject && jQuery( element ).is( settings.load.reject ) ) { continue ; }
                  if ( content && ( !settings.load.reload || !jQuery( element ).is( settings.load.reload ) ) ) { settings.log.script[ content ] = true ; }
                  
                  if ( content ) {
                    jQuery.ajax( jQuery.extend( true, {}, settings.ajax, settings.load.ajax, { url : element.src, async : !!element.async, global : false } ) ) ;
                  } else {
                    typeof element === 'object' && ( !element.type || -1 !== element.type.toLowerCase().indexOf( 'text/javascript' ) ) &&
                    win.eval.call( win, ( element.text || element.textContent || element.innerHTML || '' ).replace( /^\s*<!(?:\[CDATA\[|\-\-)/, '/*$0*/' ) ) ;
                  }
                }
                
                if ( fire( callbacks_update.script.after, null, [ event, settings.parameter, data, textStatus, XMLHttpRequest ], settings.callbacks.async ) === false ) { break UPDATE_SCRIPT ; }
                selector === '[src][defer]' && speedcheck && settings.log.speed.name.push( 'script' ) ;
                selector === '[src][defer]' && speedcheck && settings.log.speed.time.push( settings.speed.now() - settings.log.speed.fire ) ;
                selector === '[src][defer]' && speedcheck && console.log( settings.log.speed.time ) ;
                selector === '[src][defer]' && speedcheck && console.log( settings.log.speed.name ) ;
              } ; // label: UPDATE_SCRIPT
              /* validate */ validate && validate.end() ;
            } // function: script
            
            /* verify */
            /* validate */ validate && validate.test( '++', 1, 0, 'verify' ) ;
            UPDATE_VERIFY : {
              if ( fire( callbacks_update.verify.before, null, [ event, settings.parameter ], settings.callbacks.async ) === false ) { break UPDATE_VERIFY ; }
              if ( url === canonicalizeURL( win.location.href ) ) {
                settings.retry = true ;
              } else if ( settings.retry ) {
                settings.retry = false ;
                drive( settings, event, win.location.href, false, settings.cache[ event.type.toLowerCase() ] && getCache( canonicalizeURL( win.location.href ) ) ) ;
              } else {
                throw new Error( 'throw: location mismatch' ) ;
              }
              if ( fire( callbacks_update.verify.after, null, [ event, settings.parameter ], settings.callbacks.async ) === false ) { break UPDATE_VERIFY ; }
            } ; // label: UPDATE_VERIFY
            
            /* load */
            /* validate */ validate && validate.test( '++', 1, 0, 'load' ) ;
            load_css() ;
            jQuery( doc ).trigger( settings.gns + '.ready' ) ;
            jQuery( win ).bind( settings.gns + '.rendering', function ( event ) {
              jQuery( event.target ).unbind( event.type + '.rendering', arguments.callee ) ;
              rendering() ;
              load_script( ':not([defer]), :not([src])' ) ;
              !settings.load.sync && load_script( '[src][defer]' ) ;
              rendering( true ) ;
            } ).trigger( settings.gns + '.rendering' ) ;
            
            if ( fire( callbacks_update.success, null, [ event, settings.parameter, data, textStatus, XMLHttpRequest ], settings.callbacks.async ) === false ) { break UPDATE ; }
            if ( fire( callbacks_update.complete, null, [ event, settings.parameter, data, textStatus, XMLHttpRequest ], settings.callbacks.async ) === false ) { break UPDATE ; }
            if ( fire( settings.callback, null, [ event, settings.parameter, data, textStatus, XMLHttpRequest ], settings.callbacks.async ) === false ) { break UPDATE ; }
            /* validate */ validate && validate.test( '++', 1, 0, 'success' ) ;
          } catch( err ) {
            /* validate */ validate && validate.test( '++', !String( err.message ).indexOf( "throw:" ), err, 'catch' ) ;
            /* validate */ validate && validate.test( '++', !( err.message === 'throw: location mismatch' && url !== win.location.href ), [ url, win.location.href ], "!( err.message === 'throw: location mismatch' && url !== win.location.href )" ) ;
            
            /* cache delete */
            cache && setCache( url ) ;
            
            if ( fire( callbacks_update.error, null, [ event, settings.parameter, data, textStatus, XMLHttpRequest ], settings.callbacks.async ) === false ) { break UPDATE ; }
            if ( fire( callbacks_update.complete, null, [ event, settings.parameter, data, textStatus, XMLHttpRequest ], settings.callbacks.async ) === false ) { break UPDATE ; }
            /* validate */ validate && validate.test( '++', 1, [ url, win.location.href ], 'error' ) ;
            if ( settings.fallback ) { return typeof settings.fallback === 'function' ? fire( settings.fallback, null, [ event, url ] ) : fallback( event, validate ) ; }
          } ;
          
          if ( fire( callbacks_update.after, null, [ event, settings.parameter, data, textStatus, XMLHttpRequest ], settings.callbacks.async ) === false ) { break UPDATE ; }
          
          speedcheck && settings.log.speed.name.push( 'complete' ) ;
          speedcheck && settings.log.speed.time.push( settings.speed.now() - settings.log.speed.fire ) ;
          /* validate */ validate && validate.test( '++', 1, 0, 'end' ) ;
          /* validate */ validate && validate.end() ;
        } ; // label: UPDATE
      } // function: update
    } // function: drive
    
    function canonicalizeURL( url ) {
      // trim
      url = trim( url ) ;
      // Deny value beginning with the string of HTTP (S) other than
      url = /^https?:/i.test( url ) ? url : '' ;
      // Remove string starting with an invalid character
      url = url.replace( /[<>"{}|\\^\[\]`\s].*/,'' ) ;
      // Unify to UTF-8 encoded values
      return encodeURI( decodeURI( url ) ) ;
    } // function: canonicalizeURL
    
    function trim( text ) {
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
    } // function: trim
    
    function fire( fn, context, args, async ) {
      if ( typeof fn === 'function' ) { return async ? setTimeout( function () { fn.apply( context, args ) }, 0 ) : fn.apply( context, args ) ; } else { return fn ; }
    } // function: fire
    
    function hashscroll( cancel ) {
      var hash = settings.destination.hash.slice( 1 ) ;
      cancel = cancel || !hash ;
      return !cancel && jQuery( '#' + ( hash ? hash : ', [name~=' + hash + ']' ) ).first().each( function () {
        isFinite( jQuery( this ).offset().top ) && win.scrollTo( jQuery( win ).scrollLeft(), parseInt( Number( jQuery( this ).offset().top ), 10 ) ) ;
      } ).length ;
    } // function: hashscroll
    
    function wait( ms ) {
      var defer = jQuery.Deferred() ;
      if ( !ms ) { return defer.resolve() ; }
      
      setTimeout( function () { defer.resolve() ; }, ms ) ;
      return defer.promise() ; // function: wait
    } // function: wait
    
    function fallback( event, validate ) {       
      /* validate */ validate && validate.test( '++', 1, 0, 'fallback()' ) ;
      /* validate */ validate && validate.end() ;
      if ( event.type.toLowerCase() === 'click' ) {
        win.location.href = event.currentTarget.href ;
      } else if ( event.type.toLowerCase() === 'submit' ) {
        event.target.submit() ;
      } else if ( event.type.toLowerCase() === 'popstate' ) {
        win.location.reload() ;
      }
    } // function: fallback
    
    function find( data, pattern ) {
      var result = [] ;
      data.replace( pattern, function () { result.push( arguments[ 1 ] ) ; } ) ;
      return result ;
    } // function: find
    
    function scope( settings, relocation ) {
      var scp, arr, loc, des, dirs, dir, keys, key, pattern, not, reg, rewrite, inherit, hit_loc, hit_des ;
      
      scp = settings.scope ;
      loc = settings.location.pathname + settings.location.search + settings.location.hash ;
      des = settings.destination.pathname + settings.destination.search + settings.destination.hash ;
      if ( settings.location.pathname.charAt( 0 ) !== '/' ) { loc = '/' + loc ,des = '/' + des ; }
      
      arr = loc.replace( /^\//, '' ).replace( /([?#])/g, '/$1' ).split( '/' ) ;
      keys = ( relocation || loc ).replace( /^\//, '' ).replace( /([?#])/g, '/$1' ).split( '/' ) ;
      if ( relocation ) {
        if ( -1 === relocation.indexOf( '*' ) ) { return undefined ; }
        dirs = [] ;
        for ( var i = keys.length ; i-- ; ) { '*' === keys[ i ] && dirs.unshift( arr[ i ] ) ; }
      }
      
      for ( var i = keys.length + 1 ; i-- ; ) {
        rewrite = inherit = hit_loc = hit_des = false ;
        key = keys.slice( 0, i ).join( '/' ).replace( /\/([?#])/g, '$1' ) ;
        key = '/' + key + ( ( relocation || loc ).charAt( key.length + 1 ) === '/' ? '/' : '' ) ;
        
        if ( !key || !( key in scp ) ) { continue ; }
        if ( !scp[ key ] || !scp[ key ].length ) { return false ; }
        
        for ( var j = 0 ; pattern = scp[ key ][ j ] ; j++ ) {
          if ( !relocation && pattern === 'rewrite' && typeof scp.rewrite === 'function' ) {
            rewrite = scope( settings, fire( scp.rewrite, null, [ settings.destination.href ] ) ) ;
            if ( rewrite ) {
              hit_loc = hit_des = true ;
            } else if ( false === rewrite ) {
              return false ;
            }
          } else if ( pattern === 'inherit' ) {
            inherit = true ;
          } else {
            not = '^' === pattern.charAt( 0 ) ;
            pattern = not ? pattern.slice( 1 ) : pattern ;
            reg = '*' === pattern.charAt( 0 ) ;
            pattern = reg ? pattern.slice( 1 ) : pattern ;
            
            if ( relocation && -1 !== pattern.indexOf( '/*/' ) ) {
              for ( var k = 0, len = dirs.length ; k < len ; k++ ) { pattern = pattern.replace( '/*/', '/' + dirs[ k ] + '/' ) ; }
            }
            
            if ( ( not || !hit_loc ) && ( reg ? !loc.search( pattern ) : !loc.indexOf( pattern ) ) ) {
              if ( not ) { return false ; } else { hit_loc = true ; }
            }
            if ( ( not || !hit_des ) && ( reg ? !des.search( pattern ) : !des.indexOf( pattern ) ) ) {
              if ( not ) { return false ; } else { hit_des = true ; }
            }
          }
        }
        
        if ( hit_loc && hit_des ) { return true ; }
        if ( inherit ) { continue ; }
        return undefined ;
      }
    } // function: scope
    
    function setCache( url, title, size, textStatus, XMLHttpRequest ) {
      var history = settings.history ;
      if ( !settings.hashquery ) { url = url.replace( /#.*/, '' ) ; }
      switch ( true ) {
        case 1 === arguments.length :
          for ( var i = 0, key ; key = history.order[ i ] ; i++ ) {
            if ( url === key ) {
              history.order.splice( i, 1 ) ;
              history.size -= history.data[ key ].size ;
              history.data[ key ] = null ;
              delete history.data[ key ] ;
            }
          }
          break ;
          
        case typeof XMLHttpRequest === 'object' :
          history.order.unshift( url ) ;
          for ( var i = 1, key ; key = history.order[ i ] ; i++ ) { if ( url === key ) { history.order.splice( i, 1 ) ; } }
          
          if ( history.data[ url ] ) { break ; }
          history.size > history.config.size && cleanCache() ;
          
          size = parseInt( size || ( XMLHttpRequest.responseText || '' ).length * 1.8 || 1024*1024, 10 ) ;
          history.size = history.size || 0 ;
          history.size += size ;
          history.data[ url ] = {
            XMLHttpRequest : XMLHttpRequest,
            textStatus : textStatus,
            title : title,
            size : size,
            timestamp : ( new Date() ).getTime()
          } ;
          break ;
          
        default :
          return false ;
      }
      return true ;
    } // function: setCache
    
    function getCache( url ) {
      var history = settings.history ;
      if ( !settings.hashquery ) { url = url.replace( /#.*/, '' ) ; }
      history.data[ url ] && settings.timestamp > history.data[ url ].timestamp + history.config.expire && setCache( url ) ;
      return history.data[ url ] ;
    } // function: getCache
    
    function clearCache() {
      var history = settings.history ;
      for ( var i = history.order.length, url ; url = history.order[ --i ] ; ) {
        history.order.splice( i, 1 ) ;
        history.size -= history.data[ url ].size ;
        delete history.data[ url ] ;
      }
      return true ;
    } // function: clearCache
    
    function cleanCache() {
      var history = settings.history ;
      for ( var i = history.order.length, url ; url = history.order[ --i ] ; ) {
        if ( i >= history.config.length || settings.timestamp > history.data[ url ].timestamp + history.config.expire ) {
          history.order.splice( i, 1 ) ;
          history.size -= history.data[ url ].size ;
          delete history.data[ url ] ;
        }
      }
      return true ;
    } // function: cleanCache
    
    function database() {
      /* validate */ var validate = settings.validate ? settings.validate.clone( { name : 'jquery.pjax.js - database()' } ) : false ;
      /* validate */ validate && validate.start() ;
      /* validate */ validate && ( validate.scope = function( code ){ return eval( code ) ; } ) ;
      var version = 1, idb = settings.database, name = settings.gns, db, store, days = Math.floor( settings.timestamp / ( 1000*60*60*24 ) ) ;
      if ( !idb || !name ) {
        /* validate */ validate && validate.end() ;
        return false ;
      }
      
      try {
        version = parseInt( days - days % 7 + version, 10 ) ;
        /* validate */ validate && validate.test( '++', 1, version, 'version' ) ;
        db = idb.open( name ) ;
        db.onupgradeneeded = function () {
          /* validate */ validate && validate.test( '++', 1, 0, 'onupgradeneeded()' ) ;
          var db = this.result ;
          for ( var i = 0, len = db.objectStoreNames.length ; i < len ; i++ ) { db.deleteObjectStore( db.objectStoreNames[ i ] ) ; }
          store = db.createObjectStore( name, { keyPath: 'id', autoIncrement: false } ) ;
          store.createIndex( 'date', 'date', { unique: false } ) ;
        } ;
        db.onsuccess = function () {
          /* validate */ validate && validate.test( '++', 1, 0, 'onsuccess()' ) ;
          var db = this.result ;
          if ( !db.objectStoreNames || !db.objectStoreNames.length ) {
            store = db.createObjectStore( name, { keyPath: 'id', autoIncrement: false } ) ;
            store.createIndex( 'date', 'date', { unique: false } ) ;
          }
          settings.database = this.result ;
          
          var store = typeof settings.database === 'object' && settings.database.transaction && settings.database.transaction( settings.gns, 'readwrite' ).objectStore( settings.gns ) ;
          store.get( '_version' ).onsuccess = function () {
            if ( !this.result || this.result && version > this.result.title ) {
              store.clear() ;
            }
            dbVersion( version ) ;
            dbCurrent() ;
            dbTitle( settings.location.href, doc.title ) ;
          } ;
          /* validate */ validate && validate.end() ;
        } ;
        db.onerror = function ( event ) {
          /* validate */ validate && validate.test( '++', 0, event.target.errorCode, 'onerror()' ) ;
          settings.database = false ;
          idb.deleteDatabase( name ) ;
          /* validate */ validate && validate.end() ;
        } ;
        db.onblocked = function () {
          /* validate */ validate && validate.test( '++', 0, 0, 'onblocked()' ) ;
          settings.database = false ;
        } ;
      } catch ( err ) {
        /* validate */ validate && validate.test( '++', 0, err, 'error' ) ;
        settings.database = false ;
        /* validate */ validate && validate.end() ;
      }
    } // function: database
    
    function dbCurrent() {
      var store = typeof settings.database === 'object' && settings.database.transaction && settings.database.transaction( settings.gns, 'readwrite' ).objectStore( settings.gns ) ;
      
      if ( !store ) { return ; }
      store.put( { id : '_current', title : settings.hashquery ? win.location.href : win.location.href.replace( /#.*/, '' ) } ) ;
    } // function: dbCurrent
    
    function dbVersion( version ) {
      var store = typeof settings.database === 'object' && settings.database.transaction && settings.database.transaction( settings.gns, 'readwrite' ).objectStore( settings.gns ) ;
      
      if ( !store ) { return ; }
      store.put( { id : '_version', title : version } ) ;
    } // function: dbVersion
    
    function dbTitle( url, title ) {
      var store = typeof settings.database === 'object' && settings.database.transaction && settings.database.transaction( settings.gns, 'readwrite' ).objectStore( settings.gns ) ;
      
      if ( !store ) { return ; }
      if ( !settings.hashquery ) { url = url.replace( /#.*/, '' ) ; }
      if ( title ) {
        store.get( url ).onsuccess = function () {
          store.put( jQuery.extend( true, {}, this.result || {}, { id : url, title : title, date : settings.timestamp } ) ) ;
          dbClean( store ) ;
        } ;
      } else {
        store.get( url ).onsuccess = function () {
          this.result && this.result.title && ( doc.title = this.result.title ) ;
        } ;
      }
    } // function: dbTitle
    
    function dbScroll( scrollX, scrollY ) {
      var store = typeof settings.database === 'object' && settings.database.transaction && settings.database.transaction( settings.gns, 'readwrite' ).objectStore( settings.gns ) ;
      var url = settings.location.href, title = doc.title, len = arguments.length ;
      
      if ( !settings.scroll.record || !store ) { return ; }
      if ( !settings.hashquery ) { url = url.replace( /#.*/, '' ) ; }
      store.get( '_current' ).onsuccess = function () {
        if ( !this.result || !this.result.title || url !== this.result.title ) { return ; }
        if ( len ) {
          store.get( url ).onsuccess = function () {
            store.put( jQuery.extend( true, {}, this.result || {}, { scrollX : parseInt( Number( scrollX ), 10 ), scrollY : parseInt( Number( scrollY ), 10 ) } ) ) ;
          }
        } else {
          store.get( url ).onsuccess = function () {
            this.result && isFinite( this.result.scrollX ) && isFinite( this.result.scrollY ) &&
            win.scrollTo( parseInt( Number( this.result.scrollX ), 10 ), parseInt( Number( this.result.scrollY ), 10 ) ) ;
          }
        }
      } ;
    } // function: dbScroll
    
    function dbClean( store ) {
      var IDBKeyRange = win.IDBKeyRange || win.webkitIDBKeyRange || win.mozIDBKeyRange || win.msIDBKeyRange ;
      store.count().onsuccess = function () {
        if ( 1000 < this.result ) {
          store.index( 'date' ).openCursor( IDBKeyRange.upperBound( settings.timestamp - ( 1000*60*60*24*3 ) ) ).onsuccess = function () {
            var cursor = this.result ;
            if ( cursor ) {
              cursor[ 'delete' ]( cursor.value.id ) ;
              cursor[ 'continue' ]() ;
            } else {
              store.count().onsuccess = function () { 1000 < this.result && store.clear() ; }
            }
          }
        }
      } ;
    } // function: dbClean
    
    function on() {
      settings.disable = false ;
    } // function: on
    
    function off() {
      settings.disable = true ;
    } // function: off
    
    function click( url, attr ) {
      attr = attr || {}, attr.href = url ;
      return url ? jQuery( '<a/>', attr ).one( 'click', 1, plugin_store.click ).click() : false ;
    } // function: click
    
    function submit( url, attr, data ) {
      var form, df = doc.createDocumentFragment(), type, element ;
      switch ( true ) {
        case typeof url === 'object' :
          form = jQuery( url ) ;
          break ;
          
        case !!data :
          attr = attr || {} ;
          attr.action = url ;
          type = data instanceof Array && Array || data instanceof Object && Object || undefined ;
          for ( var i in data ) {
            element = data[ i ] ;
            switch ( type ) {
              case Object :
                element = jQuery( '<textarea/>', { name : i } ).val( element ) ;
                break ;
              case Array :
                element.attr = element.attr || {} ;
                element.attr.name = element.name ;
                element = jQuery( !element.tag.indexOf( '<' ) ? element.tag : '<' + element.tag + '/>', element.attr || {} ).val( element.value ) ;
                break ;
              default :
                continue ;
            }
            df.appendChild( element[ 0 ] ) ;
          }
          form = jQuery( '<form/>', attr ).append( df ) ;
          break ;
          
        default :
          return false ;
      }
      form.one( 'submit', 1, plugin_store.submit ).submit() ;
      return true ;
    } // function: submit
    
    function share() {
      
      if ( !jQuery.falsandtru ) { jQuery.fn.falsandtru = falsandtru ; jQuery.falsandtru = falsandtru ; }
      
      jQuery.falsandtru( 'share', 'history', settings.history ) ;
      settings.history = jQuery.falsandtru( 'share', 'history' ) ;
      
    } // function: share
    
    function falsandtru( namespace, key, value ) {
      var obj, response ;
      
      switch ( true ) {
        case namespace === undefined :
          break ;
          
        case key === undefined :
          response = jQuery.falsandtru[ namespace ] ;
          break ;
          
        case value === undefined :
          response = namespace in jQuery.falsandtru ? jQuery.falsandtru[ namespace ][ key ] : undefined ;
          break ;
          
        case value !== undefined :
          if ( !( jQuery.falsandtru[ namespace ] instanceof Object ) ) { jQuery.falsandtru[ namespace ] = {} ; }
          if ( jQuery.falsandtru[ namespace ][ key ] instanceof Object && value instanceof Object ) {
            jQuery.extend( true, jQuery.falsandtru[ namespace ][ key ], value )
          } else {
            jQuery.falsandtru[ namespace ][ key ] = value ;
          }
          response = jQuery.falsandtru[ namespace ][ key ] ;
          break ;
          
        default :
          break ;
      }
      
      return response ;
    } // function: falsandtru
  } ; // function: pjax
  
  ( function () {
    if ( DOMParser && DOMParser.prototype ) {
      try {
        var parser = new DOMParser ;
        if ( parser.parseFromString && parser.parseFromString( '', 'text/html' ) ) { return ; }
      } catch ( err ) {}
    } else {
      DOMParser = function(){} ;
    }
    
    DOMParser.prototype.parseFromString = function( str, type ) {
      if ( /(?:^|.+?\s+?|\s*?)text\/html(?:[\s;]|$)/i.test( type ) ) {
        var doc = document.implementation.createHTMLDocument( '' ) ;
        doc.open() ;
        doc.write( str ) ;
        doc.close() ;
        return doc ;
      } else {
        return DOMParser.prototype.parseFromString.apply( this, arguments ) ;
      }
    } ;
  } )() ;
  
} )( jQuery ) ;
