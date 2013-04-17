/*
 * 
 * pjax
 * 
 * ---
 * @Copyright(c) 2012, falsandtru
 * @license MIT  http://opensource.org/licenses/mit-license.php  http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
 * @version 1.8.0
 * @updated 2013/04/17
 * @author falsandtru  http://fat.main.jp/  http://sa-kusaku.sakura.ne.jp/
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
 * or
 *
 * $( 'div.pjaxLinkArea' ).pjax(
 * {
 *   area : 'div.pjax:not(.no-pjax)' ,
 *   link : 'a.pjaxLinks' ,
 *   scrollTop : null ,
 *   scrollLeft : null ,
 *   callback : callback ,
 *   callbacks :
 *   {
 *     ajax :
 *     {
 *       beforeSend : function( arg , XMLHttpRequest ){ XMLHttpRequest.overrideMimeType( 'text/html;charset=UTF-8' ) ; }
 *       error : error
 *     }
 *   }
 *   wait : 100
 * }) ;
 *
 * function callback()
 * {
 *   if( window._gaq ){ _gaq.push( ['_trackPageview'] ) ; }
 * }
 *
 * function error( arg , XMLHttpRequest )
 * {
 *   alert( 'pjax cancel.\n' + XMLHttpRequest.status + ' ' + XMLHttpRequest.statusText ) ;
 * }
 * 
 */

( function() {
  
  if ( typeof window[ 'jQuery' ] === 'undefined' ) { return ; } ;
  
  var $ = jQuery = window[ 'jQuery' ] , undefined = void( 0 ) , win = window , doc = document , plugin_data = [ 'settings' ] ;
  
  jQuery.fn.pjax = pjax ;
  jQuery.pjax = pjax ;
  pjax = null ;
  
  
  function pjax( options ) {
    
    /* Transfer process */
    if ( typeof this === 'function' ) { return arguments.callee.apply( jQuery( doc ) , arguments ) ; } ;
    
    /* Variable initialization */
    var
      defaults = {
        id : 0 ,
        gns : 'pjax' ,
        ns : undefined ,
        area : undefined ,
        link : 'a:not([target])[href^="/"]' ,
        form : undefined ,
        scrollTop : 0 ,
        scrollLeft : 0 ,
        ajax : {} ,
        cache : { click : true , submit : true , popstate : true , length : 9 /* pages */ , size : 1*1024*1024 /* 1MB */ , expire : 30*60*1000 /* 30min */ } ,
        callback : function() {} ,
        callbacks : { ajax : {} , update : { url : {} , title : {} , content : {} , css : {} , script : {} , cache : {} } } ,
        parameter : undefined ,
        load : { css : false , script : false , sync : true , async : 0 } ,
        interval : 300 ,
        wait : 0 ,
        fallback : true ,
        server : { query : 'pjax' } ,
        delay : 500 ,
        speed : { check : false }
      } ,
      settings = jQuery.extend( true , {} , defaults , options ) ;
    
    jQuery.extend
    (
      true ,
      settings , {
        nss : {
          class4html : [ settings.gns + ( settings.ns ? '-' + settings.ns : '' ) ].join( '.' ) ,
          click : [ 'click' , settings.gns + ( settings.ns ? ':' + settings.ns : '' ) ].join( '.' ) ,
          submit : [ 'submit' , settings.gns + ( settings.ns ? ':' + settings.ns : '' ) ].join( '.' ) ,
          popstate : [ 'popstate' , settings.gns + ( settings.ns ? ':' + settings.ns : '' ) ].join( '.' ) ,
          data : settings.gns + ( settings.ns ? ':' + settings.ns : '' ) ,
          requestHeader : [ 'X' , settings.gns.replace( /^(\w)/ , function( $1 ) { return $1.toUpperCase() ; } ) ].join( '-' )
        } ,
        history : { order : [] , data : {} , size : 0 } ,
        timestamp : ( new Date() ).getTime() ,
        speed : { now : function() { return ( new Date() ).getTime() ; } , log : { retry : 0 } }
      }
    ) ;
    
    
    /* Process startup */
    if ( !check() ) { return this ; } ;
    
    register( this , settings ) ;
    
    return this ; // function: pjax
    
    
    /* Function declaration */
    
    function check() {
      if ( !supportPushState() ) { return false ; } ;
      if ( !jQuery( settings.area ).length ) { return false ; }
      return true ;
    } // function: check
    
    function supportPushState() {
      return 'pushState' in win.history && win.history[ 'pushState' ] !== null ;
    } // function: supportPushState
    
    function register( context , settings ) {
      settings.id = plugin_data.length ;
      plugin_data.push( settings )
      
      DELEGATE_CLICK : {
        if ( !settings.link ) { break DELEGATE_CLICK ; } ;
        if ( settings.form ) { break DELEGATE_CLICK ; } ;
        
        jQuery( context )
        .undelegate( settings.link , settings.nss.click )
        .delegate( settings.link , settings.nss.click , settings.id , function( event ) {
          if ( event.which>1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ) { return this ; } ;
          if ( location.protocol !== this.protocol || location.host !== this.host ) { return this ; } ;
          if ( location.pathname === this.pathname && location.search === this.search && location.hash !== this.hash ) { return this ; } ;
          
          var settings, url , cache ;
          settings = plugin_data[ event.data ] ;
          url = this.href ;
          if ( settings.cache[ event.type.toLowerCase() ] ) { cache = settings.history.data[ url ] ; } ;
          if ( cache && event.timeStamp > cache.timestamp + settings.cache.expire ) { cache = undefined ; } ;
          
          drive( this , event , url , url !== location.href , plugin_data[ event.data ] , cache ) ;
          event.preventDefault() ;
        } ) ;
      } ; // label: DELEGATE_CLICK
      
      DELEGATE_SUBMIT : {
        if ( !settings.form ) { break DELEGATE_SUBMIT ; } ;
        
        jQuery( context )
        .undelegate( settings.form , settings.nss.submit )
        .delegate( settings.form , settings.nss.submit , settings.id , function( event ) {
          var settings, url , cache ;
          settings = plugin_data[ event.data ] ;
          url = jQuery( event.target ).attr( 'action' ) ;
          if ( settings.cache[ event.type.toLowerCase() ] ) { cache = settings.history.data[ url ] ; } ;
          if ( cache && event.timeStamp > cache.timestamp + settings.cache.expire ) { cache = undefined ; } ;
          
          drive( this , event , url , true , plugin_data[ event.data ] , cache ) ;
          event.preventDefault() ;
        } ) ;
      } ; // label: DELEGATE_SUBMIT
      
      BIND_POPSTATE : {
        jQuery( win )
        .unbind( settings.nss.popstate )
        .bind( settings.nss.popstate , settings.id , function( event ) {
          var settings, url , cache ;
          settings = plugin_data[ event.data ] ;
          url = location.href ;
          if ( settings.cache[ event.type.toLowerCase() ] ) { cache = settings.history.data[ url ] ; } ;
          if ( cache && event.timeStamp > cache.timestamp + settings.cache.expire ) { cache = undefined ; } ;
          
          if ( settings.timestamp !== false && settings.delay > event.timeStamp - settings.timestamp ) {
            settings.timestamp = false ;
            plugin_data[ settings.id ] = settings ;
            return ; 
          } ;
          
          drive( this , event , url , false , plugin_data[ event.data ] , cache ) ;
          event.preventDefault() ;
        } ) ;
      } ; // label: BIND_POPSTATE
    } // function: register
    
    function drive( context , event , url , register , settings , cache ) {
      settings.speed.check ? settings.speed.log.fire = event.timeStamp : null ;
      settings.speed.check ? settings.speed.log.time = [] : null ;
      settings.speed.check ? settings.speed.log.name = [] : null ;
      settings.speed.check ? settings.speed.log.name.push( 'fire' ) : null ;
      settings.speed.check ? settings.speed.log.time.push( settings.speed.now() - settings.speed.log.fire ) : null ;
      
      
      if ( fire( settings.callbacks.before , context , [ event , settings.parameter ] ) === false ) { return context ; } ; // function: ajax
      
      if ( cache ) {
        if ( jQuery.when ) {
          jQuery.when( wait( settings.wait ) ).done( function() { update( cache ) ; } ) ;
        } else {
          update( cache )  ;
        } ;
        return ;
      } ;
      
      var
        data ,
        dataType ,
        XMLHttpRequest ,
        textStatus ,
        errorThrown ,
        title ,
        query = [] ,
        request = [] ,
        callbacks = {
          dataFilter : function( arg1 , arg2 ) {
            data = arg1 ;
            dataType = arg2 ;
            
            return fire( settings.callbacks.ajax.dataFilter , context , [ event , settings.parameter , data , dataType ] ) ;
          } ,
          complete : function( arg1 , arg2 ) {
            XMLHttpRequest = arg1 ;
            textStatus = arg2 ;
            
            fire( settings.callbacks.ajax.complete , context , [ event , settings.parameter , XMLHttpRequest , textStatus ] ) ;
          }
        } ;
      
      for ( var i in callbacks ) {
        if ( i in settings.callbacks.ajax ) { continue ; } ;
        delete callbacks[ i ] ;
      } ;
      
      POPSTATE : {
        if ( event.type.toLowerCase() !== 'popstate' ) { break POPSTATE ; } ;
        
        GET : {
          query = url.match( /\?[^\s]*/ ) ;
          if ( !query || query[ 0 ] === '?' ) { break GET ; } ;
          
          settings.ajax.type = 'GET' ;
        } ;
        settings.ajax.data = null ;
      } ;
      
      SUBMIT : {
        if ( event.type.toLowerCase() !== 'submit' ) { break SUBMIT ;} ;
        
        url = url.replace( /\?[^\s]*/ , '' ) ;
        settings.ajax.type = jQuery( event.target ).attr( 'method' ).toUpperCase() ;
        
        GET : {
          if ( settings.ajax.type !== 'GET' ) { break GET ;} ;
          
          url += '?' + jQuery( event.target ).serialize() ;
          settings.ajax.data = null ;
        } ;
        
        POST : {
          if ( settings.ajax.type !== 'POST' ) { break POST ;} ;
          
          settings.ajax.data = jQuery( event.target ).serializeArray() ;
        } ;
      } ;
      
      URL : {
        if ( !settings.server.query ) { break URL ; } ;
        url = url.replace( /(#[^\s]*|)$/ , ( !url.match( /\?/ ) ? '?' :'&' ) + encodeURIComponent( settings.server.query ) + '=1' + '$1' ) ;
      } ;
      
      settings.speed.check ? settings.speed.log.name.push( 'ajax_start' ) : null ;
      settings.speed.check ? settings.speed.log.time.push( settings.speed.now() - settings.speed.log.fire ) : null ;
      jQuery.when ? ajax_regular() : ajax_legacy() ;
      
      if ( fire( settings.callbacks.after , context , [ event , settings.parameter ] ) === false ) { return context ; } ; // function: ajax
      
      
      /* ajax function */
      
      function ajax_regular() {
        jQuery
        .when
        (
          wait( settings.wait ) ,
          jQuery.ajax
          (
            jQuery.extend
            (
              true , {} ,
              settings.ajax ,
              callbacks , {
                url : url ,
                beforeSend : function( arg1 ) {
                  XMLHttpRequest = arg1 ;
                  
                  XMLHttpRequest.setRequestHeader( settings.nss.requestHeader , 'true' ) ;
                  XMLHttpRequest.setRequestHeader( settings.nss.requestHeader + '-Area' , settings.area ) ;
                  XMLHttpRequest.setRequestHeader( settings.nss.requestHeader + '-CSS' , settings.load.css ) ;
                  XMLHttpRequest.setRequestHeader( settings.nss.requestHeader + '-Script' , settings.load.script ) ;
                  
                  fire( settings.callbacks.ajax.beforeSend , context , [ event , settings.parameter , XMLHttpRequest ] ) ;
                } ,
                success : function( arg1 , arg2 , arg3 ) {
                  data = arg1 ;
                  dataType = arg2 ;
                  XMLHttpRequest = arg3 ;
                  
                  fire( settings.callbacks.ajax.success , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) ;
                } ,
                error : function( arg1 , arg2 , arg3 ) {
                  XMLHttpRequest = arg1 ;
                  textStatus = arg2 ;
                  errorThrown = arg3 ;
                  
                  fire( settings.callbacks.ajax.error , context , [ event , settings.parameter , XMLHttpRequest , textStatus , errorThrown ] ) ;
                  settings.fallback ? fallback( event ) : null ;
                }  
              }
            )
          )
        )
        .done( function() { update() ; } )
        .fail()
        .always() ;
      } // function: ajax_regular
      
      /* + legacy support */
      function ajax_legacy() {
        /* + when */
        jQuery.ajax
        (
          jQuery.extend
          (
            true , {} ,
            settings.ajax ,
            callbacks , {
              url : url ,
              beforeSend : function( arg1 ) {
                XMLHttpRequest = arg1 ;
                
                XMLHttpRequest.setRequestHeader( settings.nss.requestHeader , 'true' ) ;
                XMLHttpRequest.setRequestHeader( settings.nss.requestHeader + '-Area' , settings.area ) ;
                XMLHttpRequest.setRequestHeader( settings.nss.requestHeader + '-CSS' , settings.load.css ) ;
                XMLHttpRequest.setRequestHeader( settings.nss.requestHeader + '-Script' , settings.load.script ) ;
                
                fire( settings.callbacks.ajax.beforeSend , context , [ event , settings.parameter , XMLHttpRequest ] ) ;
              } ,
              success : function( arg1 , arg2 , arg3 ) {
                data = arg1 ;
                dataType = arg2 ;
                XMLHttpRequest = arg3 ;
                
                fire( settings.callbacks.ajax.success , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) ;
                
                update() ;
              } ,
              error : function( arg1 , arg2 , arg3 ) {
                XMLHttpRequest = arg1 ;
                textStatus = arg2 ;
                errorThrown = arg3 ;
                
                fire( settings.callbacks.ajax.error , context , [ event , settings.parameter , XMLHttpRequest , textStatus , errorThrown ] ) ;
                settings.fallback ? fallback( event ) : null ;
              }
            }
          )
        )
        /* - when */
      } // function: ajax_legacy
      /* - legacy support */
    
      function update( cache ) {
        UPDATE : {
          settings.speed.check ? settings.speed.log.name.push( 'update_start' ) : null ;
          settings.speed.check ? settings.speed.log.time.push( settings.speed.now() - settings.speed.log.fire ) : null ;
          if ( fire( settings.callbacks.update.before , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE ; } ;
          
          try {
            
            if ( !cache && XMLHttpRequest.getResponseHeader( 'Content-Type' ).indexOf( 'text/html' ) === -1 ) { throw new Error() ; } ;
            
            /* variable initialization */
            var title , css , script ;
            
            /* cache */
            UPDATE_CACHE : {
              if ( fire( settings.callbacks.update.cache.before , context , [ event , settings.parameter , cache ] ) === false ) { break UPDATE_CACHE ; } ;
              if ( cache ) {
                XMLHttpRequest = cache.XMLHttpRequest ;
                data = XMLHttpRequest.responseText ;
                dataType = cache.dataType ;
                title = cache.title ;
                css = cache.css ;
                script = cache.script ;
                event = cache.event ;
              } ;
              if ( fire( settings.callbacks.update.cache.after , context , [ event , settings.parameter , cache ] ) === false ) { break UPDATE_CACHE ; } ;
            } ;
            
            /* variable initialization */
            var
              page = jQuery( data ) ,
              parsable = 0 < page.filter( 'title' ).length ,
              title = title ? title : parsable ? page.filter( 'title' ).text() : filter( data , '<title>([^<]*)</title>' ) ,
              css ,
              script ,
              areas = settings.area.split( ',' ) ,
              scrollX = settings.scrollLeft === null ? jQuery( win ).scrollLeft() : parseInt( settings.scrollLeft ) ,
              scrollY = settings.scrollTop === null ? jQuery( win ).scrollTop() : parseInt( settings.scrollTop ) ;
            
            
            if ( !jQuery( settings.area ).length || !page.find( settings.area ).add( page.filter( settings.area ) ).length ) { throw new Error() ; } ;
            
            /* url */
            UPDATE_URL : {
              if ( fire( settings.callbacks.update.url.before , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE_URL ; } ;
              url = url.replace( new RegExp( '[?&]' + settings.server.query + '=.*?([\s\W#&]|$)' ) , '' )
              register ? history.pushState( null , win.opera || ( 'userAgent' in win && userAgent.indexOf( 'opera' ) !== -1 ) ? title : doc.title , url )
                       : null ;
              if ( fire( settings.callbacks.update.url.after , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE_URL ; } ;
            } ;
            
            /* title */
            UPDATE_TITLE : {
              if ( fire( settings.callbacks.update.title.before , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE_TITLE ; } ;
              doc.title = title ;
              if ( fire( settings.callbacks.update.title.after , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE_TITLE ; } ;
            } ;
            
            /* content */
            UPDATE_CONTENT : {
              if ( fire( settings.callbacks.update.content.before , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE_CONTENT ; } ;
              for ( var i = 0 , area ; area = areas[ i ] ; i++ ) {
                jQuery( area ).html( page.find( area ).add( page.filter( area ) ).html() ) ;
                settings.load.script && settings.load.sync ? jQuery( area ).append( jQuery( '<div/>' , {
                  'class' : settings.nss.class4html + '-loaded' , 'style' : 'display: block !important; visibility: hidden !important; width: auto !important; height: 0 !important; margin: 0 !important; padding: 0 !important; border: none !important; position: absolute !important; top: -9999px !important; left: -9999px !important; font-size: 12px !important; text-indent: 0 !important;'
                } ).text( 'pjax' ) ) : null ;
              } ;
              if ( fire( settings.callbacks.update.content.after , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE_CONTENT ; } ;
            } ;
            
            /* css */
            settings.load.css ? setTimeout( function() { load_css() ; } , settings.load.async || 0 ) : null ;
            function load_css() {
              UPDATE_CSS : {
                if ( fire( settings.callbacks.update.css.before , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE_CSS ; } ;
                
                css = css ? css
                          : parsable ? page.find( 'link[rel="stylesheet"], style' ).add( page.filter( 'link[rel="stylesheet"], style' ) )
                                     : filter( data , '(<link[^>]*?rel="stylesheet"[^>]*?>|<style[^>]*?>(.|[\n\r])*?</style>)' ) ;
                
                // 対象現行全要素に削除フラグを立てる。
                jQuery( 'link[rel="stylesheet"], style' ).filter( function() { return jQuery.data( this , settings.nss.data , true ) ; } ) ;
                // 対象移行全要素を走査する。
                for ( var i = 0 , element , consistent ; element = css[ i ] ; i++ ) {
                  
                  consistent = false ;
                  element = parsable ? element : jQuery( element )[ 0 ] ;
                  
                  LINK : {
                    if ( element.tagName.toUpperCase() !== 'LINK' ) { break LINK ; } ;
                    // 現行要素と移行要素を比較、一致するものがあれば次の走査へ移る。
                    // 一致するものがなければ移行要素を追加し、一致するものがない現行要素を削除する。
                    if
                    (
                      jQuery( 'link[rel="stylesheet"]' ).filter( function() {
                        // 一致しないためFALSEを返す
                        if ( consistent || this.href !== element.href ) { return false ; } ;
                        // 一致したためTRUEを返す。一致した要素に削除フラグが立っていればこれを消す。
                        consistent = true ;
                        jQuery.data( this , settings.nss.data ) ? jQuery.data( this , settings.nss.data , false ) : null ;
                        return true ;
                      } ).length
                    ) { continue ; } ;
                  } ;
                  
                  STYLE : {
                    if ( element.tagName.toUpperCase() !== 'STYLE' ) { break STYLE ; } ;
                    if
                    (
                      jQuery( 'style' ).filter( function() {
                        if ( consistent || !jQuery.data( this , settings.nss.data ) || this.innerHTML !== element.innerHTML ) { return false ; } ;
                        consistent = true ;
                        jQuery.data( this , settings.nss.data , false ) ;
                        return true ;
                      } ).length
                    ) { continue ; } ;
                  } ;
                  
                  jQuery.data( jQuery( 'head' ).append( element ).children( ':last-child' )[ 0 ] , settings.nss.data , false ) ;
                  element = null ;
                } ;
                jQuery( 'link[rel="stylesheet"], style' ).filter( function() { return jQuery.data( this , settings.nss.data ) ; } ).remove() ;
                
                if ( fire( settings.callbacks.update.css.after , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE_CSS ; } ;
                settings.speed.check ? settings.speed.log.name.push( 'css' ) : null ;
                settings.speed.check ? settings.speed.log.time.push( settings.speed.now() - settings.speed.log.fire ) : null ;
              } ; // label: UPDATE_CSS
            } // function: css
            
            /* script */
            settings.load.script ? setTimeout( function() { load_script( 'async' ) ; } , settings.load.async || 0 ) : null ;
            function load_script( type ) {
              UPDATE_SCRIPT : {
                if ( fire( settings.callbacks.update.script.before , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE_SCRIPT ; } ;
                
                script = script ? script
                                : parsable ? page.find( 'script' ).add( page.filter( 'script' ) )
                                           : filter( data , '(?:[^\'\"]|^\s*)(<script[^>]*?>(.|[\n\r])*?</script>)(?:[^\'\"]|\s*$)' ) ;
                
                for ( var i = 0 , element , defer , consistent ; element = script[ i ] ; i++ ) {
                  
                  consistent = false ;
                  element = parsable ? element : jQuery( element )[ 0 ] ;
                  
                  if ( settings.load.sync && type === 'sync' && !element.defer ) { continue ; } ;
                  if ( settings.load.sync && type === 'async' && element.defer ) { continue ; } ;
                  
                  if
                    (
                      jQuery( 'script[src]' ).filter( function() {
                        if ( consistent || this.src !== element.src ) { return false ; } ;
                        consistent = true ;
                        return true ;
                      } ).length
                  ) { continue ; } ;
                  
                  jQuery.data( jQuery( 'head' ).append( element ).children( ':last-child' )[ 0 ] , settings.nss.data , false ) ;
                  element = null ;
                } ;
                
                if ( fire( settings.callbacks.update.script.after , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE_SCRIPT ; } ;
              } ; // label: UPDATE_SCRIPT
            } // function: script
            
            if ( settings.load.script && settings.load.sync ) {
              setTimeout( function() {
                if ( jQuery( settings.area ).length === jQuery( settings.area ).children( '.' + settings.nss.class4html + '-loaded' ).filter( function() { return this.clientWidth ; } ).length ) {
                  jQuery( settings.area ).children( '.' + settings.nss.class4html + '-loaded' ).remove() ;
                  setTimeout( function() { load_script( 'sync' ) ; } , 0 ) ;
                  settings.speed.check ? settings.speed.log.name.push( 'script' ) : null ;
                  settings.speed.check ? settings.speed.log.time.push( settings.speed.now() - settings.speed.log.fire ) : null ;
                  settings.speed.check ? console.log( settings.speed.log.time ) : null ;
                  settings.speed.check ? console.log( settings.speed.log.name ) : null ;
                  settings.speed.check ? console.log( settings.speed.log.retry ) : null ;
                } else {
                  setTimeout( function() { arguments.callee() ; } , settings.interval ) ;
                  settings.speed.check ? ++settings.speed.log.retry : null ;
                } ;
              } , 0 ) ;
            } ;
            
            /* scroll */
            register && -1 < 'click,submit'.indexOf( event.type.toLowerCase() ) ? win.scrollTo( scrollX , scrollY ) : null ;
            
            /* cache */
            UPDATE_CACHE : {
              if ( !settings.cache[ event.type.toLowerCase() ] || settings.ajax.type === 'POST' ) { break UPDATE_CACHE ; } ;
              
              var cache_history = settings.history , size ;
              
              cache_history.order.unshift( url ) ;
              for ( var i = 1 , key ; key = cache_history.order[ i ] ; i++ ) { if ( url === key ) { cache_history.order.splice( i , 1 ) ; } ; } ;
              
              if ( cache ) { break UPDATE_CACHE ; } ;
              
              size = data.length * 2 ;
              cache_history.size += size ;
              cache_history.data[ url ] = {
                event : event ,
                data : null ,
                dataType : dataType ,
                XMLHttpRequest : XMLHttpRequest ,
                title : title ,
                css : css ,
                script : script ,
                size : size ,
                timestamp : ( new Date() ).getTime()
              } ;
              
              for ( var i = cache_history.order.length - 1 , key , size = cache_history.size ; key = cache_history.order[ i ] ; i-- ) {
                if ( i >= settings.cache.length || cache_history.size > settings.cache.size || event.timeStamp > cache_history.data[ key ].timestamp + settings.cache.expire ) {
                  cache_history.order.pop() ;
                  cache_history.size -= cache_history.data[ key ].size ;
                  cache_history.data[ key ] = null ;
                  delete cache_history.data[ key ] ;
                } ;
              } ;
              settings.history = cache_history ;
            } ;
            plugin_data[ settings.id ] = settings ;
            
            if ( fire( settings.callbacks.update.success , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE ; } ;
            if ( fire( settings.callbacks.update.complete , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE ; } ;
            if ( fire( settings.callback , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE ; } ;
          } catch( err ) {
            /* cache delete */
            UPDATE_CACHE : {
              if ( !cache ) { break UPDATE_CACHE ; } ;
              
              var cache_history = settings.history ;
              
              cache_history.order.unshift( url ) ;
              for ( var i = 1 , key ; key = cache_history.order[ i ] ; i++ ) { if ( url === key ) { cache_history.order.splice( i , 1 ) ; } ; } ;
              for ( var i = cache_history.order.length - 1 , key , size = cache_history.size ; key = cache_history.order[ i ] ; i-- ) {
                if ( i >= settings.cache.length || cache_history.size > settings.cache.size || event.timeStamp > cache_history.data[ key ].timestamp + settings.cache.expire ) {
                  cache_history.order.pop() ;
                  cache_history.size -= cache_history.data[ key ].size ;
                  cache_history.data[ key ] = null ;
                  delete cache_history.data[ key ] ;
                } ;
              } ;
              settings.history = cache_history ;
            } ;
            plugin_data[ settings.id ] = settings ;
            
            if ( fire( settings.callbacks.update.error , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE ; } ;
            if ( fire( settings.callbacks.update.complete , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE ; } ;
            settings.fallback ? fallback( event ) : null ;
          } ;
          
          if ( fire( settings.callbacks.update.after , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE ; } ;
          
          settings.speed.check ? settings.speed.log.name.push( 'end' ) : null ;
          settings.speed.check ? settings.speed.log.time.push( settings.speed.now() - settings.speed.log.fire ) : null ;
        } ; // label: UPDATE
      } // function: update
    } // function: ajax
    
    function fire( fn , context , args ) {
      if ( typeof fn === 'function' ) { return fn.apply( context , args ) ; } ;
    } // function: fire
    
    function wait( ms ) {
      var dfd = jQuery.Deferred() ;
      if ( !ms ) { return dfd.resolve() ; } ;
      
      setTimeout( function() { dfd.resolve() ; } , ms ) ;
      return dfd.promise() ; // function: wait
    } // function: wait
    
    function fallback( event ) {
      if ( event.type.toLowerCase() === 'click' ) {
        location.href = event.currentTarget.href ;
      } else if ( event.type.toLowerCase() === 'submit' ) {
        context.submit() ;
      } else if ( event.type.toLowerCase() === 'popstate' ) {
        location.reload() ;
      } ;
    } // function: fallback
    
    function filter( data , pattern ) {
      var result = [] ;
      
      data.replace( new RegExp( pattern , "gim" ) , function( $0 , $1 ) { result.push( $1 ) ; } )
      
      return result ;
    } // function: filter
  } // function: pjax
} )() ;
