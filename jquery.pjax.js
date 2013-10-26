/*
 * 
 * pjax
 * 
 * ---
 * @Copyright(c) 2012, falsandtru
 * @license MIT  http://opensource.org/licenses/mit-license.php  http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
 * @version 1.22.0
 * @updated 2013/10/26
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
  
  var win = window , doc = document , undefined = void( 0 ) , plugin_data = [ 'settings' ] , plugin_store , plugin_response ;
  
  jQuery.fn.pjax = jQuery.pjax = function ( options ) {
    
    /* Transfer process */
    if ( typeof this === 'function' ) { return arguments.callee.apply( jQuery( doc ) , arguments ) ; }
    
    /* validate */ var validate = window.validator instanceof Object ? window.validator : false ;
    /* validate */ validate = validate ? validator.clone( { name : 'jquery.pjax.js' , base : true , timeout : { limit : options && options.ajax && options.ajax.timeout ? options.ajax.timeout + validate.timeout.limit : validate.timeout.limit } } ) : false ;
    /* validate */ validate && validate.start() ;
    /* validate */ validate && validate.test( '++', 1, options, 'pjax()' ) ;
    
    /* Variable initialization */
    /* validate */ validate && validate.test( '++', 1, 0, 'initialize' ) ;
    var defaults = {
          id : 0 ,
          gns : 'pjax' ,
          ns : null ,
          area : null ,
          link : 'a:not([target])[href^="/"]' ,
          form : null ,
          scope : null ,
          state : null ,
          scrollTop : 0 ,
          scrollLeft : 0 ,
          ajax : {} ,
          contentType : 'text/html' ,
          cache : {
            click : false , submit : false , popstate : false , get : true , post : true ,
            length : 9 /* pages */ , size : 1*1024*1024 /* 1MB */ , expire : 30*60*1000 /* 30min */
          } ,
          callback : function () {} ,
          callbacks : {
            ajax : {} ,
            update : { url : {} , title : {} , content : {} , css : {} , script : {} , cache : { load : {} , save : {} } , rendering : {} , verify : {} } ,
            async : false
          } ,
          parameter : null ,
          load : { css : false , script : false , execute : true , sync : true , ajax : { dataType : 'script' } , rewrite : null } ,
          interval : 300 ,
          wait : 0 ,
          scroll : { delay : 500 , suspend : -100 } ,
          fix : { location : true , history : true , scroll : true } ,
          hashquery : false ,
          fallback : true ,
          database : true ,
          server : {} ,
          speedcheck : false
        } ,
        settings = jQuery.extend( true , {} , defaults , options ) ,
        nsArray = [ settings.gns ] ;
    
    /* validate */ validate && validate.test( '++', 1, settings, 'overwrite' ) ;
    jQuery.extend
    (
      true ,
      settings ,
      {
        nss : {
          pjax : nsArray.join( '.' ) ,
          click : [ 'click' ].concat( nsArray.join( ':' ) ).join( '.' ) ,
          submit : [ 'submit' ].concat( nsArray.join( ':' ) ).join( '.' ) ,
          popstate : [ 'popstate' ].concat( nsArray.join( ':' ) ).join( '.' ) ,
          scroll : [ 'scroll' ].concat( nsArray.join( ':' ) ).join( '.' ) ,
          data : nsArray.join( ':' ) ,
          class4html : nsArray.join( '-' ) ,
          requestHeader : [ 'X' , nsArray[ 0 ].replace( /^\w/ , function ( $0 ) { return $0.toUpperCase() ; } ) ].join( '-' ) ,
          array : nsArray
        } ,
        location : jQuery( '<a/>' , { href : win.location.href } )[ 0 ] ,
        destination : jQuery( '<a/>' , { href : win.location.href } )[ 0 ] ,
        hashclick : false ,
        contentType : settings.contentType.replace( /\s*[,;]\s*/g , '|' ).toLowerCase() ,
        scroll : { queue : [] } ,
        database : settings.database ? ( win.indexedDB || win.webkitIndexedDB || win.mozIndexedDB || win.msIndexedDB || null ) : false ,
        server : { query : !settings.server.query ? settings.gns : settings.server.query } ,
        log : { script : {} , speed : {} } ,
        history : { config : settings.cache , order : [] , data : {} , size : 0 } ,
        timestamp : ( new Date() ).getTime() ,
        disable : false ,
        landing : win.location.href ,
        retry : true ,
        xhr : null ,
        speed : { now : function () { return ( new Date() ).getTime() ; } } ,
        options : options ,
        validate : validate
      }
    ) ;
    
    settings.id = 1 ;
    plugin_data[ settings.id ] = settings ;
    plugin_store = {} ;
    plugin_response = {
      on : on ,
      off : off ,
      click : click ,
      submit : submit ,
      setCache : setCache ,
      getCache : getCache ,
      clearCache : clearCache
    } ;
    jQuery.extend( true , jQuery.pjax , plugin_response ) ;
    
    /* Process startup */
    /* validate */ validate && validate.test( '++', 1, 0, 'register' ) ;
    if ( check() ) { share() , register( this ) ; }
    
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
        var element = this , src ;
        element = typeof settings.load.rewrite === 'function' ? fire( settings.load.rewrite , null , [ element.cloneNode() ] ) || element : element ;
        src = element.src ;
        if ( src && !( src in settings.log.script ) ) { settings.log.script[ src ] = true ; }
      } ) ;
      
      settings.link &&
      jQuery( context )
      .undelegate( settings.link , settings.nss.click )
      .delegate( settings.link , settings.nss.click , settings.id , plugin_store.click = function ( event ) {
        event.timeStamp = ( new Date() ).getTime() ;
        var settings = plugin_data[ 1 ] ;
        if ( settings.disable ) { return false ; }
        settings.destination.href = this.href ;
        
        if ( win.location.protocol !== this.protocol || win.location.host !== this.host ) { return ; }
        if ( event.which>1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ) { return ; }
        
        if ( settings.location.href === settings.destination.href ) { return false ; }
        
        if ( !fire( settings.hashquery , null , [ event , this.href ] ) && settings.location.pathname + settings.location.search === settings.destination.pathname + settings.destination.search ) { return settings.hashclick = true ; }
        
        var url , cache ;
        
        url = this.href ;
        settings.area = fire( settings.options.area , null , [ event , url ] ) ;
        settings.hashclick = false ;
        settings.timestamp = event.timeStamp ;
        if ( settings.landing ) { settings.landing = false ; }
        if ( !jQuery( settings.area ).length || settings.scope && !scope( settings ) ) { return ; }
        
        if ( settings.cache[ event.type.toLowerCase() ] ) { cache = getCache( url ) ; }
        
        drive( settings , event , url , true , cache ) ;
        return false ;
      } ) ;
      
      settings.form &&
      jQuery( context )
      .undelegate( settings.form , settings.nss.submit )
      .delegate( settings.form , settings.nss.submit , settings.id , plugin_store.submit = function ( event ) {
        event.timeStamp = ( new Date() ).getTime() ;
        var settings = plugin_data[ 1 ] ;
        if ( settings.disable ) { return false ; }
        settings.destination.href = this.action ;
        
        if ( event.which>1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ) { return ; }
        
        var url , cache ;
        
        url = this.action + ( event.target.method.toUpperCase() === 'GET' ? '?' + jQuery( event.target ).serialize() : '' ) ;
        settings.area = fire( settings.options.area , null , [ event , url ] ) ;
        settings.hashclick = false ;
        settings.timestamp = event.timeStamp ;
        if ( settings.landing ) { settings.landing = false ; }
        if ( !jQuery( settings.area ).length || settings.scope && !scope( settings ) ) { return ; }
        
        if ( settings.cache[ event.type.toLowerCase() ] && settings.cache[ event.target.method.toLowerCase() ] ) { cache = getCache( url ) ; }
        
        drive( settings , event , url , true , cache ) ;
        return false ;
      } ) ;
      
      jQuery( win )
      .unbind( settings.nss.popstate )
      .bind( settings.nss.popstate , settings.id , plugin_store.popstate = function ( event ) {
        event.timeStamp = ( new Date() ).getTime() ;
        var settings = plugin_data[ 1 ] ;
        if ( settings.disable ) { return false ; }
        settings.destination.href = win.location.href ;
        
        if ( settings.location.href === settings.destination.href ) { return false ; }
        
        var url , cache ;
        
        if ( !fire( settings.hashquery , null , [ event , url ] ) && settings.location.pathname + settings.location.search === win.location.pathname + win.location.search ) { return settings.hashclick = settings.hashclick && hashmove() && false ; }
        
        url = win.location.href ;
        settings.area = fire( settings.options.area , null , [ event , url ] ) ;
        settings.hashclick = false ;
        settings.timestamp = event.timeStamp ;
        if ( settings.landing ) { if ( settings.landing === win.location.href ) { settings.landing = false ; return ; } settings.landing = false ; }
        if ( !jQuery( settings.area ).length ) { return ; }
        
        settings.database && settings.fix.history && dbTitle( url ) ;
        if ( settings.cache[ event.type.toLowerCase() ] ) { cache = getCache( url ) ; }
        
        drive( settings , event , url , false , cache ) ;
        return false ;
      } ) ;
      
      settings.database && settings.fix.scroll &&
      jQuery( win )
      .unbind( settings.nss.scroll )
      .bind( settings.nss.scroll , settings.id , function ( event , end ) {
        var settings = plugin_data[ 1 ] ;
        var id , fn = arguments.callee ;
        
        if ( !settings.scroll.delay ) {
          dbScroll( jQuery( win ).scrollLeft() , jQuery( win ).scrollTop() ) ;
        } else {
          while ( id = settings.scroll.queue.shift() ) { clearTimeout( id ) ; }
          id = setTimeout( function () {
            while ( id = settings.scroll.queue.shift() ) { clearTimeout( id ) ; }
            dbScroll( jQuery( win ).scrollLeft() , jQuery( win ).scrollTop() ) ;
          } , settings.scroll.delay ) ;
          
          settings.scroll.queue.push( id ) ;
        }
        
        if ( settings.scroll.suspend && !end ) {
          jQuery( this ).unbind( settings.nss.scroll ) ;
          setTimeout( function () {
            settings.database && settings.fix.scroll &&
            jQuery( win ).bind( settings.nss.scroll , settings.id , fn ).trigger( settings.nss.scroll , [ true ] ) ;
          } , settings.scroll.suspend ) ;
        }
        
      } ) ;
      
      jQuery( doc )
      .unbind( settings.gns + '.execute' )
      .bind( settings.gns + '.execute' , settings.id , function ( event , executes ) {
        switch ( typeof executes ) {
          case 'function' :
            settings.speedcheck && settings.log.speed.name.push( 'executable' ) ;
            settings.speedcheck && settings.log.speed.time.push( settings.speed.now() - settings.log.speed.fire ) ;
            
            executes() ;
            break;
            
          case 'object' :
            for ( var i = 0 , element ; element = executes[ i++ ] ; ) {
              if ( element.src ) {
                jQuery.ajax( jQuery.extend( true , {} , settings.ajax , settings.load.ajax , { url : element.src , async : element.async , global : false } ) ) ;
              } else {
                typeof element === 'object' && ( !element.type || -1 < element.type.toLowerCase().indexOf( 'text/javascript' ) ) &&
                eval( ( element.text || element.textContent || element.innerHTML || '' ).replace( /^\s*<!(?:\[CDATA\[|\-\-)/ , '/*$0*/' ) ) ;
              }
            }
            break;
        }
      } ) ;
    } // function: register
    
    function drive( settings , event , url , register , cache ) {
      /* validate */ var validate = settings.validate ? settings.validate.clone( { name : 'jquery.pjax.js - drive()' } ) : false ;
      /* validate */ validate && validate.start() ;
      /* validate */ validate && ( validate.scope = function( code ){ return eval( code ) ; } ) ;
      /* validate */ validate && validate.test( '++', 1, [ url, event.type ], 'drive()' ) ;
      
      settings.speedcheck && ( settings.log.speed.fire = settings.timestamp ) ;
      settings.speedcheck && ( settings.log.speed.time = [] ) ;
      settings.speedcheck && ( settings.log.speed.name = [] ) ;
      settings.speedcheck && settings.log.speed.name.push( 'fire' ) ;
      settings.speedcheck && settings.log.speed.time.push( settings.speed.now() - settings.log.speed.fire ) ;
      
      /* validate */ validate && validate.test( '++', 1, 0, 'start' ) ;
      if ( fire( settings.callbacks.before , null , [ event , settings.parameter ] , settings.callbacks.async ) === false ) { return ; } // function: drive
      
      if ( cache ) {
        /* validate */ validate && validate.test( '++', 1, 0, 'update' ) ;
        jQuery.when ? jQuery.when( wait( settings.wait ) ).done( function () { update( settings , event , cache ) ; } ) : update( settings , event , cache ) ;
        /* validate */ validate && validate.test( '++', 1, 0, 'end' ) ;
        /* validate */ validate && validate.end() ;
        return ;
      }
      
      /* validate */ validate && validate.test( '++', 1, 0, 'initialize' ) ;
      var ajax , callbacks , defer , data , XMLHttpRequest , textStatus , errorThrown , dataSize ;
      
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
          XMLHttpRequest = fire( settings.callbacks.ajax.xhr , null , [ event , settings.parameter ] , settings.callbacks.async ) ;
          XMLHttpRequest = typeof XMLHttpRequest === 'object' && XMLHttpRequest || jQuery.ajaxSettings.xhr() ;
          
          //if ( XMLHttpRequest instanceof Object && XMLHttpRequest instanceof win.XMLHttpRequest && 'onprogress' in XMLHttpRequest ) {
          //  XMLHttpRequest.addEventListener( 'progress' , function ( event ) { dataSize = event.loaded ; } , false ) ;
          //}
          return XMLHttpRequest ;
        } ,
        beforeSend : function () {
          XMLHttpRequest = arguments[ 0 ] ;
          
          settings.xhr && settings.xhr.readyState < 4 && settings.xhr.abort() ;
          settings.xhr = XMLHttpRequest ;
          
          XMLHttpRequest.setRequestHeader( settings.nss.requestHeader , 'true' ) ;
          XMLHttpRequest.setRequestHeader( settings.nss.requestHeader + '-Area' , settings.area ) ;
          XMLHttpRequest.setRequestHeader( settings.nss.requestHeader + '-CSS' , settings.load.css ) ;
          XMLHttpRequest.setRequestHeader( settings.nss.requestHeader + '-Script' , settings.load.script ) ;
          
          fire( settings.callbacks.ajax.beforeSend , null , [ event , settings.parameter , XMLHttpRequest , arguments[ 1 ] ] , settings.callbacks.async ) ;
        } ,
        dataFilter : !settings.callbacks.ajax.dataFilter ? undefined : function () {
          data = arguments[ 0 ] ;
          
          return fire( settings.callbacks.ajax.dataFilter , null , [ event , settings.parameter , data , arguments[ 1 ] ] , settings.callbacks.async ) || data ;
        } ,
        success : function () {
          data = arguments[ 0 ] ;
          textStatus = arguments[ 1 ] ;
          XMLHttpRequest = arguments[ 2 ] ;
          
          fire( settings.callbacks.ajax.success , null , [ event , settings.parameter , data , textStatus , XMLHttpRequest ] , settings.callbacks.async ) ;
          
          defer && defer.resolve() || update( settings , event ) ;
        } ,
        error : function () {
          XMLHttpRequest = arguments[ 0 ] ;
          textStatus = arguments[ 1 ] ;
          errorThrown = arguments[ 2 ] ;
          
          /* validate */ var validate = settings.validate ? settings.validate.clone( { name : 'jquery.pjax.js - drive()' } ) : false ;
          /* validate */ validate && validate.start() ;
          /* validate */ validate && validate.test( '++', 1, [ url, win.location.href, XMLHttpRequest, textStatus, errorThrown ], 'ajax error' ) ;
          fire( settings.callbacks.ajax.error , null , [ event , settings.parameter , XMLHttpRequest , textStatus , errorThrown ] , settings.callbacks.async ) ;
          
          defer && defer.resolve() ;
          if ( settings.fallback && textStatus !== 'abort' ) { return typeof settings.fallback === 'function' ? fire( settings.fallback , null , [ event , url ] ) : fallback( event , validate ) ; }
          /* validate */ validate && validate.end() ;
        } ,
        complete : !settings.callbacks.ajax.complete ? undefined : function () {
          XMLHttpRequest = arguments[ 0 ] ;
          textStatus = arguments[ 1 ] ;
          
          fire( settings.callbacks.ajax.complete , null , [ event , settings.parameter , XMLHttpRequest , textStatus ] , settings.callbacks.async ) ;
        }
      } ;
      jQuery.extend( true , ajax , settings.ajax , callbacks ) ;
      ajax.url = url.replace( /([^#]+)(#[^\s]*)?$/ , '$1' + ( settings.server.query ? ( url.match( /\?/ ) ? '&' : '?' ) + encodeURIComponent( settings.server.query ) + '=1' : '' ) + '$2' ) ;
      
      /* validate */ validate && validate.test( '++', 1, 0, 'ajax' ) ;
      settings.speedcheck && settings.log.speed.name.push( 'request' ) ;
      settings.speedcheck && settings.log.speed.time.push( settings.speed.now() - settings.log.speed.fire ) ;
      jQuery.when && jQuery.when( defer.promise() , wait( settings.wait ) ).done( function () { update( settings , event ) ; } ) ;
      jQuery.ajax( ajax )
      
      if ( fire( settings.callbacks.after , null , [ event , settings.parameter ] , settings.callbacks.async ) === false ) { return ; } // function: drive
      /* validate */ validate && validate.test( '++', 1, 0, 'end' ) ;
      /* validate */ validate && validate.end() ;
      
      
      function update( settings , event , cache ) {
        /* validate */ var validate = settings.validate ? settings.validate.clone( { name : 'jquery.pjax.js - update()' } ) : false ;
        /* validate */ validate && validate.start() ;
        /* validate */ validate && ( validate.scope = function( code ){ return eval( code ) ; } ) ;
        /* validate */ validate && validate.test( '1', 1, 0, 'update()' ) ;
        /* validate */ validate && validate.test( '++', 1, 0, 'start' ) ;
        UPDATE : {
          settings.speedcheck && settings.log.speed.name.push( 'update' ) ;
          settings.speedcheck && settings.log.speed.time.push( settings.speed.now() - settings.log.speed.fire ) ;
          if ( fire( settings.callbacks.update.before , null , [ event , settings.parameter , data , textStatus , XMLHttpRequest ] , settings.callbacks.async ) === false ) { break UPDATE ; }
          
          /* variable initialization */
          var win = window , doc = document , title , css , script ;
          
          try {
            
            /* validate */ validate && validate.test( '++', 1, 0, 'try' ) ;
            /* validate */ validate && validate.test( '++', 1, !cache ? [ settings.contentType, XMLHttpRequest.getResponseHeader( 'Content-Type' ) ] : 0, 'content-type' ) ;
            if ( !cache && -1 === XMLHttpRequest.getResponseHeader( 'Content-Type' ).toLowerCase().search( settings.contentType ) ) { throw new Error( "throw: content-type mismatch" ) ; }
            
            /* cache */
            /* validate */ validate && validate.test( '++', cache ? "'usable'" : "'unusable'", 0, 'cache' ) ;
            UPDATE_CACHE : {
              if ( !cache ) { break UPDATE_CACHE ; }
              if ( fire( settings.callbacks.update.cache.load.before , null , [ event , settings.parameter , cache ] , settings.callbacks.async ) === false ) { break UPDATE_CACHE ; }
              XMLHttpRequest = cache.XMLHttpRequest ;
              data = XMLHttpRequest.responseText ;
              textStatus = cache.textStatus ;
              title = cache.title ;
              css = cache.css ;
              script = cache.script ;
              if ( fire( settings.callbacks.update.cache.load.after , null , [ event , settings.parameter , cache ] , settings.callbacks.async ) === false ) { break UPDATE_CACHE ; }
            } ; // label: UPDATE_CACHE
            
            /* variable initialization */
            /* validate */ validate && validate.test( '++', 1, 0, 'initialize' ) ;
            var page , parsable , areas , checker ;
            page = jQuery( data ) ;
            parsable = !!title || 0 < page.filter( 'title' ).length ;
            areas = settings.area.replace( /(\((.*?(\(.*?\).*?)?)*?\)|\S)(,|$)/g , function () { return arguments[1] + ( arguments[4] ? '|' : '' ) } ).split( /\s*\|(?!=)\s*/ ) ;
            
            title = title || parsable ? page.filter( 'title' ).text() : jQuery( '<span/>' ).html( find( data , /<title>([^<]*?)<\/title>/i ).join() ).text() ;
            
            if ( !jQuery( settings.area ).length || !page.find( settings.area ).add( page.filter( settings.area ) ).length ) { throw new Error( 'throw: area length mismatch' ) ; }
            
            /* url */
            /* validate */ validate && validate.test( '++', 1, url, 'url' ) ;
            UPDATE_URL : {
              if ( fire( settings.callbacks.update.url.before , null , [ event , settings.parameter , data , textStatus , XMLHttpRequest ] , settings.callbacks.async ) === false ) { break UPDATE_URL ; } ;
              
              register && url !== win.location.href &&
              win.history.pushState(
                fire( settings.state , null , [ event , url ] ) ,
                win.opera || win.navigator.userAgent.toLowerCase().indexOf( 'opera' ) !== -1 ? title : doc.title ,
                url ) ;
              
              settings.location.href = url ;
              if ( register && settings.fix.location && /Mobile(\/\w+)? Safari/i.test( win.navigator.userAgent ) ) {
                plugin_response.off() ;
                win.history.back() ;
                win.history.forward() ;
                plugin_response.on() ;
              }
              
              if ( fire( settings.callbacks.update.url.after , null , [ event , settings.parameter , data , textStatus , XMLHttpRequest ] , settings.callbacks.async ) === false ) { break UPDATE_URL ; }
            } ; // label: UPDATE_URL
            
            /* title */
            /* validate */ validate && validate.test( '++', 1, title, 'title' ) ;
            UPDATE_TITLE : {
              if ( fire( settings.callbacks.update.title.before , null , [ event , settings.parameter , data , textStatus , XMLHttpRequest ] , settings.callbacks.async ) === false ) { break UPDATE_TITLE ; }
              doc.title = title ;
              settings.database && settings.fix.history && dbTitle( url , title ) ;
              if ( fire( settings.callbacks.update.title.after , null , [ event , settings.parameter , data , textStatus , XMLHttpRequest ] , settings.callbacks.async ) === false ) { break UPDATE_TITLE ; }
            } ; // label: UPDATE_TITLE
            
            settings.database && dbCurrent() ;
            
            /* scroll */
            /* validate */ validate && validate.test( '++', 1, 0, 'scroll' ) ;
            function scroll( call ) {
              var scrollX , scrollY ;
              switch ( event.type.toLowerCase() ) {
                case 'click' :
                case 'submit' :
                  scrollX = call && typeof settings.scrollLeft === 'function' ? fire( settings.scrollLeft , null , [ event ] ) : settings.scrollLeft ;
                  scrollX = 0 <= scrollX ? scrollX : 0 ;
                  scrollX = scrollX === null ? jQuery( win ).scrollLeft() : parseInt( Number( scrollX ) ) ;
                  
                  scrollY = call && typeof settings.scrollTop === 'function' ? fire( settings.scrollTop , null , [ event ] ) : settings.scrollTop ;
                  scrollY = 0 <= scrollY ? scrollY : 0 ;
                  scrollY = scrollY === null ? jQuery( win ).scrollTop() : parseInt( Number( scrollY ) ) ;
                  
                  ( jQuery( win ).scrollTop() === scrollY && jQuery( win ).scrollLeft() === scrollX ) || win.scrollTo( scrollX , scrollY ) ;
                  settings.database && settings.fix.scroll && dbScroll( scrollX , scrollY ) ;
                  break ;
                case 'popstate' :
                  settings.database && settings.fix.scroll && dbScroll() ;
                  break ;
              }
            } // function: scroll
            scroll( false ) ;
            
            /* content */
            /* validate */ validate && validate.test( '++', 1, areas, 'content' ) ;
            UPDATE_CONTENT : {
              if ( fire( settings.callbacks.update.content.before , null , [ event , settings.parameter , data , textStatus , XMLHttpRequest ] , settings.callbacks.async ) === false ) { break UPDATE_CONTENT ; }
              jQuery( settings.area ).children( '.' + settings.nss.class4html + '-check' ).remove() ;
              checker = jQuery( '<div/>' , {
                'class' : settings.nss.class4html + '-check' ,
                'style' : 'display: block !important; visibility: hidden !important; width: auto !important; height: 0 !important; margin: 0 !important; padding: 0 !important; border: none !important; position: absolute !important; top: -9999px !important; left: -9999px !important; font-size: 12px !important; text-indent: 0 !important;'
              } ).text( 'pjax' ) ;
              for ( var i = 0 , area ; area = areas[ i++ ] ; ) { jQuery( area ).html( page.find( area ).add( page.filter( area ) ).contents() ).append( checker.clone() ) ; }
              checker = jQuery( settings.area ).children( '.' + settings.nss.class4html + '-check' ) ;
              jQuery( doc ).trigger( settings.gns + '.DOMContentLoaded' ) ;
              if ( fire( settings.callbacks.update.content.after , null , [ event , settings.parameter , data , textStatus , XMLHttpRequest ] , settings.callbacks.async ) === false ) { break UPDATE_CONTENT ; }
            } ; // label: UPDATE_CONTENT
            
            /* cache */
            /* validate */ validate && validate.test( '++', 1, 0, 'cache' ) ;
            UPDATE_CACHE : {
              if ( cache || !settings.cache.click && !settings.cache.submit && !settings.cache.popstate ) { break UPDATE_CACHE ; }
              if ( event.type.toLowerCase() === 'submit' && !settings.cache[ event.target.method.toLowerCase() ] ) { break UPDATE_CACHE ; }
              if ( fire( settings.callbacks.update.cache.save.before , null , [ event , settings.parameter , cache ] , settings.callbacks.async ) === false ) { break UPDATE_CACHE ; }
              
              setCache( url , title , dataSize , textStatus , XMLHttpRequest )
              cahce = getCache( url ) ;
              
              if ( fire( settings.callbacks.update.cache.save.after , null , [ event , settings.parameter , cache ] , settings.callbacks.async ) === false ) { break UPDATE_CACHE ; }
            } ; // label: UPDATE_CACHE
            
            /* css */
            /* validate */ validate && validate.test( '++', 1, 0, 'css' ) ;
            function load_css() {
              /* validate */ var validate = settings.validate ? settings.validate.clone( { name : 'jquery.pjax.js - load_css()' } ) : false ;
              /* validate */ validate && validate.start() ;
              /* validate */ validate && ( validate.scope = function( code ){ return eval( code ) ; } ) ;
              UPDATE_CSS : {
                if ( fire( settings.callbacks.update.css.before , null , [ event , settings.parameter , data , textStatus , XMLHttpRequest ] , settings.callbacks.async ) === false ) { break UPDATE_CSS ; }
                
                var save ;
                cache = getCache( url ) ;
                save = cache && !cache.css ;
                css = css ? css
                          : parsable ? page.find( 'link[rel~="stylesheet"], style' ).add( page.filter( 'link[rel~="stylesheet"], style' ) ).get()
                                     : jQuery( find( data , /(<link[^>]*?rel=.[^"\']*?stylesheet[^>]*?>|<style[^>]*?>(?:.|[\n\r])*?<\/style>)/gim ) ) ;
                if ( cache && cache.css && css && css.length !== cache.css.length ) { save = true ; }
                if ( save ) { cache.css = parsable ? css : [] ; }
                
                // 対象現行全要素に削除フラグを立てる。
                jQuery( 'link[rel~="stylesheet"], style' ).filter( function () { return jQuery.data( this , settings.nss.data , true ) ; } ) ;
                // 対象移行全要素を走査する。
                for ( var i = 0 , element , links = jQuery( 'link[rel~="stylesheet"]' ) , styles = jQuery( 'style' ) , skip ; element = css[ i ] ; i++ ) {
                  
                  skip = false ;
                  element = parsable ? element : jQuery( element )[ 0 ] ;
                  element = typeof settings.load.rewrite === 'function' ? fire( settings.load.rewrite , null , [ element.cloneNode() ] ) || element : element ;
                  if ( save && !parsable ) { cache.css[ i ] = element ; }
                  
                  switch ( element.tagName.toLowerCase() ) {
                    case 'link' :
                      // 現行要素と移行要素を比較、一致するものがあれば次の走査へ移る。
                      // 一致するものがなければ移行要素を追加し、一致するものがない現行要素を削除する。
                      if ( links.filter( function () {
                             if ( skip || this.href !== element.href ) {
                               return false ;
                             } else {
                               skip = true ;
                               jQuery.removeData( this , settings.nss.data ) ;
                               return true ;
                             }
                           } ).length ) { continue ; }
                      break ;
                    
                    case 'style' :
                      if ( styles.filter( function () {
                             if ( skip || !jQuery.data( this , settings.nss.data ) || this.innerHTML !== element.innerHTML ) {
                               return false ;
                             } else {
                               skip = true ;
                               jQuery.removeData( this , settings.nss.data ) ;
                               return true ;
                             }
                           } ).length ) { continue ; }
                      break ;
                  }
                  
                  jQuery( 'head' ).append( element ) ;
                }
                jQuery( 'link[rel~="stylesheet"], style' ).filter( function () { return jQuery.data( this , settings.nss.data ) ; } ).remove() ;
                
                if ( fire( settings.callbacks.update.css.after , null , [ event , settings.parameter , data , textStatus , XMLHttpRequest ] , settings.callbacks.async ) === false ) { break UPDATE_CSS ; }
                settings.speedcheck && settings.log.speed.name.push( 'css' ) ;
                settings.speedcheck && settings.log.speed.time.push( settings.speed.now() - settings.log.speed.fire ) ;
              } ; // label: UPDATE_CSS
              /* validate */ validate && validate.end() ;
            } // function: css
            settings.load.css && setTimeout( function () { load_css() , jQuery( doc ).trigger( settings.gns + '.ready' ) ; } , 0 ) ;
            !settings.load.css && jQuery( doc ).trigger( settings.gns + '.ready' ) ;
            
            /* script */
            /* validate */ validate && validate.test( '++', 1, 0, 'script' ) ;
            function load_script( type ) {
              /* validate */ var validate = settings.validate ? settings.validate.clone( { name : 'jquery.pjax.js - load_script()' } ) : false ;
              /* validate */ validate && validate.start() ;
              /* validate */ validate && ( validate.scope = function( code ){ return eval( code ) ; } ) ;
              UPDATE_SCRIPT : {
                if ( fire( settings.callbacks.update.script.before , null , [ event , settings.parameter , data , textStatus , XMLHttpRequest ] , settings.callbacks.async ) === false ) { break UPDATE_SCRIPT ; }
                
                var save , executes = [] , callback ;
                cache = getCache( url ) ;
                save = cache && !cache.script ;
                script = script ? script
                                : parsable ? page.find( 'script' ).add( page.filter( 'script' ) ).get()
                                           : find( data , /(?:[^\'\"]|^\s*?)(<script[^>]*?>(?:.|[\n\r])*?<\/script>)(?:[^\'\"]|\s*?$)/gim ) ; //
                if ( cache && cache.script && script && script.length !== cache.script.length ) { save = true ; }
                if ( save ) { cache.script = parsable ? script : [] ; }
                
                for ( var i = 0 , element , src , defer ; element = script[ i ] ; i++ ) {
                  
                  element = parsable ? element : jQuery( element )[ 0 ] ;
                  element = typeof settings.load.rewrite === 'function' ? fire( settings.load.rewrite , null , [ element.cloneNode() ] ) || element : element ;
                  if ( save && !parsable ) { cache.script[ i ] = element ; }
                  src = element.src ;
                  defer = element.defer ;
                  
                  if ( type === 'sync' && !defer ) { continue ; }
                  if ( type === 'async' && defer ) { continue ; }
                  
                  if ( src && src in settings.log.script ) { continue ; } else if ( src ) { settings.log.script[ src ] = true ; }
                  
                  executes.push( element ) ;
                }
                
                if ( fire( settings.callbacks.update.script.after , null , [ event , settings.parameter , data , textStatus , XMLHttpRequest ] , settings.callbacks.async ) === false ) { break UPDATE_SCRIPT ; }
                type === 'sync' && settings.speedcheck && settings.log.speed.name.push( 'script' ) ;
                type === 'sync' && settings.speedcheck && settings.log.speed.time.push( settings.speed.now() - settings.log.speed.fire ) ;
              } ; // label: UPDATE_SCRIPT
              /* validate */ validate && validate.end() ;
              return executes ;
            } // function: script
            jQuery( doc ).trigger( settings.gns + '.execute' , [ rendering ] ) ;
            settings.load.script && setTimeout( function () { jQuery( doc ).trigger( settings.gns + '.execute' , [ load_script( 'async' ) ] ) ; } , 0 ) ;
            settings.load.script && !settings.load.sync && setTimeout( function () { jQuery( doc ).trigger( settings.gns + '.execute' , [ load_script( 'sync' ) ] ) ; } , 0 ) ;
            
            /* rendering */
            /* validate */ validate && validate.test( '++', 1, 0, 'rendering' ) ;
            function rendering( type ) {
              if ( fire( settings.callbacks.update.rendering.before , null , [ event , settings.parameter ] , settings.callbacks.async ) === false ) { return ; }
              setTimeout( function () {
                if ( checker.filter( function () { return this.clientWidth || jQuery( this ).is( ':hidden' ) ; } ).length === checker.length ) {
                  
                  rendered() ;
                  
                } else if ( checker.length ) {
                  setTimeout( function () { arguments.callee() ; } , settings.interval ) ;
                }
              } , 0 ) ;
            } // function: rendering
            function rendered() {
              checker.remove() ;
              settings.load.script && settings.load.sync && setTimeout( function () { jQuery( doc ).trigger( settings.gns + '.execute' , [ 'sync' , load_script( 'sync' ) ] ) ; } , 0 ) ;
              hashmove( event.type.toLowerCase() === 'popstate' ) || scroll( true ) ;
              jQuery( window ).trigger( settings.gns + '.load' ) ;
              
              if ( fire( settings.callbacks.update.rendering.after , null , [ event , settings.parameter ] , settings.callbacks.async ) === false ) { return ; }
              settings.speedcheck && settings.log.speed.name.push( 'rendered' ) ;
              settings.speedcheck && settings.log.speed.time.push( settings.speed.now() - settings.log.speed.fire ) ;
              settings.speedcheck && console.log( settings.log.speed.time ) ;
              settings.speedcheck && console.log( settings.log.speed.name ) ;
            } // function: rendered
            
            /* verify */
            /* validate */ validate && validate.test( '++', 1, 0, 'verify' ) ;
            UPDATE_VERIFY : {
              if ( fire( settings.callbacks.update.verify.before , null , [ event , settings.parameter ] , settings.callbacks.async ) === false ) { break UPDATE_VERIFY ; }
              if ( url === win.location.href ) {
                settings.retry = true ;
              } else if ( settings.retry ) {
                settings.retry = false ;
                drive( settings , event , win.location.href , false , settings.cache[ event.type.toLowerCase() ] && getCache( win.location.href ) ) ;
              } else {
                throw new Error( 'throw: location mismatch' ) ;
              }
              if ( fire( settings.callbacks.update.verify.after , null , [ event , settings.parameter ] , settings.callbacks.async ) === false ) { break UPDATE_VERIFY ; }
            } ; // label: UPDATE_VERIFY
            
            if ( fire( settings.callbacks.update.success , null , [ event , settings.parameter , data , textStatus , XMLHttpRequest ] , settings.callbacks.async ) === false ) { break UPDATE ; }
            if ( fire( settings.callbacks.update.complete , null , [ event , settings.parameter , data , textStatus , XMLHttpRequest ] , settings.callbacks.async ) === false ) { break UPDATE ; }
            if ( fire( settings.callback , null , [ event , settings.parameter , data , textStatus , XMLHttpRequest ] , settings.callbacks.async ) === false ) { break UPDATE ; }
            /* validate */ validate && validate.test( '++', 1, 0, 'success' ) ;
          } catch( err ) {
            /* validate */ validate && validate.test( '++', !String( err.message ).indexOf( "throw:" ), err, 'catch' ) ;
            /* validate */ validate && validate.test( '++', !( err.message === 'throw: location mismatch' && url !== win.location.href ), [ url, win.location.href ], "!( err.message === 'throw: location mismatch' && url !== win.location.href )" ) ;
            
            /* cache delete */
            cache && setCache( url ) ;
            
            if ( fire( settings.callbacks.update.error , null , [ event , settings.parameter , data , textStatus , XMLHttpRequest ] , settings.callbacks.async ) === false ) { break UPDATE ; }
            if ( fire( settings.callbacks.update.complete , null , [ event , settings.parameter , data , textStatus , XMLHttpRequest ] , settings.callbacks.async ) === false ) { break UPDATE ; }
            /* validate */ validate && validate.test( '++', 1, [ url, win.location.href ], 'error' ) ;
            if ( settings.fallback ) { return typeof settings.fallback === 'function' ? fire( settings.fallback , null , [ event , url ] ) : fallback( event , validate ) ; }
          } ;
          
          if ( fire( settings.callbacks.update.after , null , [ event , settings.parameter , data , textStatus , XMLHttpRequest ] , settings.callbacks.async ) === false ) { break UPDATE ; }
          
          settings.speedcheck && settings.log.speed.name.push( 'ready' ) ;
          settings.speedcheck && settings.log.speed.time.push( settings.speed.now() - settings.log.speed.fire ) ;
          /* validate */ validate && validate.test( '++', 1, 0, 'end' ) ;
          /* validate */ validate && validate.end() ;
        } ; // label: UPDATE
      } // function: update
    } // function: drive
    
    function fire( fn , context , args , async ) {
      if ( typeof fn === 'function' ) { return async ? setTimeout( function () { fn.apply( context , args ) } , 0 ) : fn.apply( context , args ) ; } else { return fn ; }
    } // function: fire
    
    function hashmove( cancel ) {
      var hash = win.location.hash.slice( 1 ) ;
      cancel = cancel || !hash ;
      return !cancel && jQuery(  '#' + ( hash ? hash : ', [name~=' + hash + ']' ) ).first().each( function () {
        isFinite( jQuery( this ).offset().top ) && win.scrollTo( jQuery( win ).scrollLeft() , parseInt( Number( jQuery( this ).offset().top ) ) ) ;
      } ).length ;
    } // function: hashmove
    
    function wait( ms ) {
      var defer = jQuery.Deferred() ;
      if ( !ms ) { return defer.resolve() ; }
      
      setTimeout( function () { defer.resolve() ; } , ms ) ;
      return defer.promise() ; // function: wait
    } // function: wait
    
    function fallback( event , validate ) {       
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
    
    function find( data , pattern ) {
      var result = [] ;
      data.replace( pattern , function () { result.push( arguments[ 1 ] ) ; } )
      return result ;
    } // function: find
    
    function scope( settings , relocation ) {
      var scp , arr , loc , des , dirs , dir , keys , key , pattern , not , reg , rewrite , inherit , hit_loc , hit_des ;
      
      scp = settings.scope ;
      loc = settings.location.pathname + settings.location.search + settings.location.hash ;
      des = settings.destination.pathname + settings.destination.search + settings.destination.hash ;
      if ( loc === des ) { return true ; }
      
      arr = loc.replace( /^\// , '' ).replace( /([?#])/g , '/$1' ).split( '/' ) ;
      keys = ( relocation || loc ).replace( /^\// , '' ).replace( /([?#])/g , '/$1' ).split( '/' ) ;
      if ( relocation ) {
        if ( -1 === relocation.indexOf( '*' ) ) { return undefined ; }
        dirs = [] ;
        for ( var i = keys.length ; i-- ; ) { '*' === keys[ i ] && dirs.unshift( arr[ i ] ) ; }
      }
      
      for ( var i = keys.length + 1 ; i-- ; ) {
        rewrite = inherit = hit_loc = hit_des = false ;
        key = keys.slice( 0 , i ).join( '/' ).replace( /\/([?#])/g , '$1' ) ;
        key = '/' + key + ( ( relocation || loc ).charAt( key.length + 1 ) === '/' ? '/' : '' ) ;
        
        if ( !key || !( key in scp ) ) { continue ; }
        if ( !scp[ key ] || !scp[ key ].length ) { return false ; }
        
        for ( var j = 0 ; pattern = scp[ key ][ j ] ; j++ ) {
          if ( !relocation && pattern === 'rewrite' && typeof scp.rewrite === 'function' ) {
            rewrite = scope( settings , fire( scp.rewrite , null , [ settings.destination.href ] ) ) ;
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
              for ( var k = 0 , len = dirs.length ; k < len ; k++ ) { pattern = pattern.replace( '/*/' , '/' + dirs[ k ] + '/' ) ; }
            }
            
            if ( ( not || !hit_loc ) && ( reg ? !loc.search( pattern ) : !loc.indexOf( pattern ) ) ) {
              if ( not ) { return false ; } else { hit_loc = true ; }
            }
            if ( ( not || !hit_des ) && ( reg ? !des.search( pattern ) : !des.indexOf( pattern ) ) ) {
              if ( not ) { return false ; } else { hit_des = true ; }
            }
          }
        }
        
        if ( hit_loc && hit_to ) { return true ; }
        if ( inherit ) { continue ; }
        return undefined ;
      }
    } // function: scope
    
    function setCache( url , title , size , textStatus , XMLHttpRequest ) {
      var history = settings.history ;
      url = settings.hashquery ? url : url.replace( /#.*/ , '' ) ;
      switch ( true ) {
        case 1 === arguments.length :
          for ( var i = 0 , key ; key = history.order[ i ] ; i++ ) {
            if ( url === key ) {
              history.order.splice( i , 1 ) ;
              history.size -= history.data[ key ].size ;
              history.data[ key ] = null ;
              delete history.data[ key ] ;
            }
          }
          break ;
          
        case typeof XMLHttpRequest === 'object' :
          history.order.unshift( url ) ;
          for ( var i = 1 , key ; key = history.order[ i ] ; i++ ) { if ( url === key ) { history.order.splice( i , 1 ) ; } }
          
          if ( history.data[ url ] ) { break ; }
          history.size > history.config.size && cleanCache() ;
          
          size = parseInt( size || XMLHttpRequest.responseText.length * 1.8 ) ;
          history.size = history.size || 0 ;
          history.size += size ;
          history.data[ url ] = {
            XMLHttpRequest : XMLHttpRequest ,
            textStatus : textStatus ,
            title : title ,
            size : size ,
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
      url = settings.hashquery ? url : url.replace( /#.*/ , '' ) ;
      history.data[ url ] && settings.timestamp > history.data[ url ].timestamp + history.config.expire && setCache( url ) ;
      return history.data[ url ] ;
    } // function: getCache
    
    function clearCache() {
      var history = settings.history ;
      for ( var i = history.order.length , url ; url = history.order[ --i ] ; ) {
        history.order.splice( i , 1 ) ;
        history.size -= history.data[ url ].size ;
        delete history.data[ url ] ;
      }
      return true ;
    } // function: clearCache
    
    function cleanCache() {
      var history = settings.history ;
      for ( var i = history.order.length , url ; url = history.order[ --i ] ; ) {
        if ( i >= history.config.length || settings.timestamp > history.data[ url ].timestamp + history.config.expire ) {
          history.order.splice( i , 1 ) ;
          history.size -= history.data[ url ].size ;
          delete history.data[ url ] ;
        }
      }
      return true ;
    } // function: cleanCache
    
    function database() {
      var version = 2 , idb = settings.database , name = settings.gns , db , store , days = Math.floor( settings.timestamp / ( 1000*60*60*24 ) ) ;
      if ( !idb || !name ) { return false ; }
      
      db = idb.open( name , days - days % 7 + version )
      db.onupgradeneeded = function () {
        var db = this.result ;
        for ( var i = 0 , len = db.objectStoreNames.length ; i < len ; i++ ) { db.deleteObjectStore( db.objectStoreNames[ i ] ) ; }
        store = db.createObjectStore( name , { keyPath: 'id', autoIncrement: false } ) ;
        store.createIndex( 'date' , 'date' , { unique: false } ) ;
      }
      db.onsuccess = function () {
        settings.database = this.result ;
        dbCurrent() ;
        dbTitle( win.location.href , doc.title ) ;
      }
      db.onerror = function () {
        settings.database = false ;
      }
    } // function: database
    
    function dbCurrent() {
      var store = typeof settings.database === 'object' && settings.database.transaction( settings.gns , 'readwrite' ).objectStore( settings.gns ) ;
      
      if ( !store ) { return ; }
      store.put( { id : 'current' , title : win.location.href } ) ;
    } // function: dbCurrent
    
    function dbTitle( url , title ) {
      var store = typeof settings.database === 'object' && settings.database.transaction( settings.gns , 'readwrite' ).objectStore( settings.gns ) ;
      
      if ( !store ) { return ; }
      if ( title ) {
        store.get( url ).onsuccess = function () {
          store.put( jQuery.extend( true , {} , this.result || {} , { id : url , title : title , date : settings.timestamp } ) ) ;
          dbClean( store ) ;
        }
      } else {
        store.get( url ).onsuccess = function () {
          this.result && this.result.title && ( doc.title = this.result.title ) ;
        }
      }
    } // function: dbTitle
    
    function dbScroll( scrollX , scrollY ) {
      var store = typeof settings.database === 'object' && settings.database.transaction( settings.gns , 'readwrite' ).objectStore( settings.gns ) ;
      var url = win.location.href , title = doc.title , len = arguments.length ;
      
      if ( !store ) { return ; }
      store.get( 'current' ).onsuccess = function () {
        if ( !this.result || !this.result.title || url !== this.result.title ) { return ; }
        if ( len ) {
          store.get( url ).onsuccess = function () {
            store.put( jQuery.extend( true , {} , this.result || {} , { title : title , scrollX : parseInt( Number( scrollX ) ) , scrollY : parseInt( Number( scrollY ) ) } ) ) ;
          }
        } else {
          store.get( url ).onsuccess = function () {
            this.result && isFinite( this.result.scrollX ) && isFinite( this.result.scrollY ) &&
            win.scrollTo( parseInt( Number( this.result.scrollX ) ) , parseInt( Number( this.result.scrollY ) ) ) ;
          }
        }
      }
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
      }
    } // function: dbClean
    
    function on() {
      settings.disable = false ;
    } // function: on
    
    function off() {
      settings.disable = true ;
    } // function: off
    
    function click( url , attr ) {
      attr = attr || {} , attr.href = url ;
      return url ? jQuery( '<a/>' , attr ).one( 'click' , 1 , plugin_store.click ).click() : false ;
    } // function: click
    
    function submit( url , attr , data ) {
      var form , df = doc.createDocumentFragment() , type , element ;
      switch ( true ) {
        case typeof url === 'object' :
          form = jQuery( url ) ;
          break ;
          
        case !!data :
          attr = attr || {} ;
          attr.action = url ;
          type = data instanceof Array && Array || data instanceof Object && Object || undefined ;
          for ( var i in data ) {
            element = data[ i ]
            switch ( type ) {
              case Object :
                element = jQuery( '<textarea/>' , { name : i } ).val( element ) ;
                break ;
              case Array :
                element.attr = element.attr || {} ;
                element.attr.name = element.name ;
                element = jQuery( !element.tag.indexOf( '<' ) ? element.tag : '<' + element.tag + '/>' , element.attr || {} ).val( element.value ) ;
                break ;
              default :
                continue ;
            }
            df.appendChild( element[ 0 ] ) ;
          }
          form = jQuery( '<form/>' , attr ).append( df ) ;
          break ;
          
        default :
          return false ;
      }
      form.one( 'submit' , 1 , plugin_store.submit ).submit() ;
      return true ;
    } // function: submit
    
    function share() {
      
      if ( !jQuery.falsandtru ) { jQuery.fn.falsandtru = falsandtru ; jQuery.falsandtru = falsandtru ; }
      
      jQuery.falsandtru( 'share' , 'history' , settings.history ) ;
      settings.history = jQuery.falsandtru( 'share' , 'history' ) ;
      
    } // function: share
    
    function falsandtru( namespace , key , value ) {
      var obj , response ;
      
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
            jQuery.extend( true , jQuery.falsandtru[ namespace ][ key ] , value )
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
  } // function: pjax
} )( jQuery ) ;
