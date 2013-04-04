/*
 * 
 * pjax
 * 
 * ---
 * @Copyright(c) 2012, falsandtru
 * @license MIT  http://opensource.org/licenses/mit-license.php  http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
 * @version 1.6.3
 * @updated 2013/04/05
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

( function( $ ) {
  
  jQuery.fn.pjax = pjax ;
  jQuery.pjax    = pjax ;
  pjax = null ;
  
  
  function pjax( options ) {
    
    /* Transfer process */
    if ( typeof this === 'function' ) { return arguments.callee.apply( jQuery( document ) , arguments ) ; } ;
    
    /* Variable initialization */
    var
      defaults = {
        gns : 'pjax' ,
        ns : undefined ,
        area : undefined ,
        link : 'a:not([target])[href^="/"]' ,
        form : undefined ,
        scrollTop : 0 ,
        scrollLeft : 0 ,
        ajax : {} ,
        callback : function() {} ,
        callbacks : { ajax : {} , update : { url : {} , title : {} , content : {} , css : {} , script : {} } } ,
        parameter : undefined ,
        load : { css : false , script : false , async : { css : false , script : false } } ,
        wait : 0 ,
        fallback : true ,
        server : { query : 'pjax' }
      } ,
      settings = jQuery.extend( true , {} , defaults , options ) ;
    
    jQuery.extend
    (
      true ,
      settings , {
        nss : {
          click : [ 'click' , settings.gns + ( settings.ns ? ':' + settings.ns : '' ) ].join( '.' ) ,
          submit : [ 'submit' , settings.gns + ( settings.ns ? ':' + settings.ns : '' ) ].join( '.' ) ,
          popstate : [ 'popstate' , settings.gns + ( settings.ns ? ':' + settings.ns : '' ) ].join( '.' ) ,
          data : settings.gns + ( settings.ns ? ':' + settings.ns : '' ) ,
          requestHeader : [ 'X' , settings.gns.replace( /^(\w)/ , function( $1 ) { return $1.toUpperCase() ; } ) ].join( '-' )
        }
      }
    ) ;
    
    /* Process startup */
    if ( !check() ) { return this ; } ;
    
    register( this , settings ) ;
    
    
    /* Function declaration */
    
    function check() {
      if ( !supportPushState() ) { return false ; } ;
      if ( !jQuery( settings.area ).length ) { return false ; }
      return true ;
    } // function: check
    
    function supportPushState() {
      return 'pushState' in window.history && window.history[ 'pushState' ] !== null ;
    } // function: supportPushState
    
    function register( context , settings ) {
      DELEGATE_CLICK : {
        if ( !settings.link ) { break DELEGATE_CLICK ; } ;
        if ( settings.form ) { break DELEGATE_CLICK ; } ;
        
        jQuery( context )
        .undelegate( settings.link , settings.nss.click )
        .delegate( settings.link , settings.nss.click , settings , function( event ) {
          if ( event.which>1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ) { return this ; } ;
          if ( location.protocol !== this.protocol || location.host !== this.host ) { return this ; } ;
          if ( location.pathname === this.pathname && location.search === this.search && location.hash !== this.hash ) { return this ; } ;
          
          ajax( this , event , this.href , location.href !== this.href , event.data ) ;
        } ) ;
      } ; // label: DELEGATE_CLICK
      
      DELEGATE_SUBMIT : {
        if ( !settings.form ) { break DELEGATE_SUBMIT ; } ;
        
        jQuery( context )
        .undelegate( settings.form , settings.nss.submit )
        .delegate( settings.form , settings.nss.submit , settings , function( event ) {
          ajax( this , event , jQuery( event.target ).attr( 'action' ) , true , event.data ) ;
        } ) ;
      } ; // label: DELEGATE_SUBMIT
      
      BIND_POPSTATE : {
        setTimeout( function() {
          jQuery( window )
          .unbind( settings.nss.popstate )
          .bind( settings.nss.popstate , settings , function( event ) {
            ajax( this , event , location.href , false , event.data ) ;
          } ) ;
        } , 100 ) ;
      } ; // label: BIND_POPSTATE
    } // function: register
    
    function ajax( context , event , url , register , settings ) {
      var
        win = window ,
        doc = document ,
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
      
      if ( fire( settings.callbacks.before , context , [ event , settings.parameter ] ) === false ) { return context ;} ; // function: ajax
      
      switch ( jQuery().jquery ) {
        case '1.0':
        case '1.0.4':
        case '1.1.0':
        case '1.1.2':
        case '1.1.3':
        case '1.1.4':
        case '1.2':
        case '1.2.3':
        case '1.2.6':
        case '1.3':
        case '1.4':
        case '1.4.1':
        case '1.4.2':
        case '1.4.3':
        case '1.4.4':
          ajax_legacy() ;
          break ;
        case '1.5':
        case '1.5.1':
        case '1.5.2':
        case '1.6':
        case '1.6.1':
        case '1.6.2':
        case '1.6.3':
        case '1.6.4':
        case '1.7':
        case '1.7.1':
        case '1.7.2':
        case '1.8':
        case '1.8.1':
        case '1.8.2':
        case '1.8.3':
        case '1.9':
        case '1.9.1':
        default :
          ajax_regular() ;
          break ;
      } ;
      
      if ( fire( settings.callbacks.after , context , [ event , settings.parameter ] ) === false ) { return context ;} ; // function: ajax
      
      event.preventDefault() ;
      
      
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
                  settings.fallback ? fallback( context ) : null ;
                }  
              }
            )
          )
        )
        .done
        (
          function( fn ) {
            UPDATE : {
              var fire = fn.fire ;
              
              if ( fire( settings.callbacks.update.before , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE ; } ;
              
              try {
                if ( XMLHttpRequest.getResponseHeader( 'Content-Type' ).indexOf( 'text/html' ) === -1 ) { throw new Error() ; } ;
                
                var
                  title = jQuery( data ).filter( 'title' ).text() ,
                  css = filter( data , '<link[^>]*?rel="stylesheet"[^>]*?>|<style[^>]*?>(.|[\n\r])*?</style>' ) ,
                  script = filter( data , '([^\'\"]|^)<script[^>]*?>(.|[\n\r])*?</script>([^\'\"]|$)' ) ,
                  areas = settings.area.split( ',' ) ,
                  scrollX = settings.scrollLeft === null ? jQuery( win ).scrollLeft() : parseInt( settings.scrollLeft ) ,
                  scrollY = settings.scrollTop === null ? jQuery( win ).scrollTop() : parseInt( settings.scrollTop ) ;
                
                
                if ( !jQuery( settings.area ).length || !jQuery( settings.area , data ).add( jQuery( data ).filter( settings.area ) ).length ) { throw new Error() ; } ;
                
                /* url */
                UPDATE_URL : {
                  if ( fire( settings.callbacks.update.url.before , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE_URL ; } ;
                  url = url.replace( new RegExp( '[?&]' + settings.server.query + '=.*?([\s\W#&]|$)' ) , '' )
                  register ? history.pushState( null , win.opera || ( 'userAgent' in win && userAgent.indexOf( 'opera' ) !== -1 ) ? title : doc.title , url ) : null ;
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
                    try { jQuery( area ).html( jQuery( area , data ).add( jQuery( data ).filter( area ) ).html() ) ; } catch( err ) {} ;
                  } ;
                  if ( fire( settings.callbacks.update.content.after , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE_CONTENT ; } ;
                } ;
                
                /* css */
                function load_css() {
                  var filter = fn.filter ;
                  
                  UPDATE_CSS : {
                    if ( !settings.load.css ) { break UPDATE_CSS ; } ;
                    
                    if ( fire( settings.callbacks.update.css.before , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE_CSS ; } ;
                    
                    // 対象現行全要素に削除フラグを立てる。
                    jQuery( 'link[rel="stylesheet"], style' ).filter( function() { return jQuery.data( this , settings.nss.data , true ) ; } ) ;
                    // 対象移行全要素を走査する。
                    for ( var i = 0 , element , consistent ; element = css[ i ] ; i++ ) {
                      element = jQuery( element )[ 0 ] ;
                      consistent = false ;
                      
                      LINK : {
                        if( element.tagName.toUpperCase() !== 'LINK' ) { break LINK ; } ;
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
                        if( element.tagName.toUpperCase() !== 'STYLE' ) { break STYLE ; } ;
                        // 現行要素と移行要素を比較、一致するものがあれば次の走査へ移る。
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
                      
                      jQuery.data( jQuery( 'head' ).append( element ).children( ':last-child' ).get( 0 ) , settings.nss.data , false ) ;
                    } ;
                    jQuery( 'link[rel="stylesheet"], style' ).filter( function() { return jQuery.data( this , settings.nss.data ) ; } ).remove() ;
                    
                    if ( fire( settings.callbacks.update.css.after , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE_CSS ; } ;
                  } ; // label: UPDATE_CSS
                } // function: css
                settings.load.async.css === false ? load_css() : setTimeout( function() { load_css() ; } , settings.load.async.css ) ;
                
                /* script */
                function load_script() {
                  var filter = fn.filter ;
                  
                  UPDATE_SCRIPT : {
                    if ( !settings.load.script ) { break UPDATE_SCRIPT ; } ;
                    
                    if ( fire( settings.callbacks.update.script.before , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE_SCRIPT ; } ;
                    
                    for ( var i = 0 , element , consistent ; element = script[ i ] ; i++ ) {
                      element = jQuery( element )[ 0 ] ;
                      consistent = false ;
                      
                      // 現行要素と移行要素を比較、一致するものがあれば次の走査へ移る。
                      if
                        (
                          jQuery( 'script[src]' ).filter( function() {
                            if ( consistent || this.src !== element.src ) { return false ; } ;
                            consistent = true ;
                            return true ;
                          } ).length
                      ) { continue ; } ;
                      
                      jQuery.data( jQuery( 'head' ).append( element ).children( ':last-child' ).get( 0 ) , settings.nss.data , false ) ;
                    } ;
                    
                    if ( fire( settings.callbacks.update.script.after , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE_SCRIPT ; } ;
                  } ; // label: UPDATE_SCRIPT
                } // function: script
                settings.load.async.script === false ? load_script() : setTimeout( function() { load_script() ; } , settings.load.async.script ) ;
                
                register && -1 < 'click,submit'.indexOf( event.type.toLowerCase() ) ? win.scrollTo( scrollX , scrollY ) : null ;
                
                if ( fire( settings.callbacks.update.success , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE ; } ;
                if ( fire( settings.callbacks.update.complete , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE ; } ;
                if ( fire( settings.callback , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE ; } ;
              } catch( err ) {
                if ( fire( settings.callbacks.update.error , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE ; } ;
                if ( fire( settings.callbacks.update.complete , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE ; } ;
                settings.fallback ? fallback( context ) : null ;
              } ;
              
              if ( fire( settings.callbacks.update.after , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE ; } ;
            } ; // label: UPDATE
          }
        )
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
                
                /* + done */
                UPDATE : {
                  var fire = fn.fire ;
                  
                  if ( fire( settings.callbacks.update.before , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE ; } ;
                  
                  try {
                    if ( XMLHttpRequest.getResponseHeader( 'Content-Type' ).indexOf( 'text/html' ) === -1 ) { throw new Error() ; } ;
                    
                    var
                      title = jQuery( data ).filter( 'title' ).text() ,
                      css = filter( data , '<link[^>]*?rel="stylesheet"[^>]*?>|<style[^>]*?>(.|[\n\r])*?</style>' ) ,
                      script = filter( data , '([^\'\"]|^)<script[^>]*?>(.|[\n\r])*?</script>([^\'\"]|$)' ) ,
                      areas = settings.area.split( ',' ) ,
                      scrollX = settings.scrollLeft === null ? jQuery( win ).scrollLeft() : parseInt( settings.scrollLeft ) ,
                      scrollY = settings.scrollTop === null ? jQuery( win ).scrollTop() : parseInt( settings.scrollTop ) ;
                    
                    
                    if ( !jQuery( settings.area ).length || !jQuery( settings.area , data ).add( jQuery( data ).filter( settings.area ) ).length ) { throw new Error() ; } ;
                    
                    /* url */
                    UPDATE_URL : {
                      if ( fire( settings.callbacks.update.url.before , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE_URL ; } ;
                      url = url.replace( new RegExp( '[?&]' + settings.server.query + '=.*?([\s\W#&]|$)' ) , '' )
                      register ? history.pushState( null , win.opera || ( 'userAgent' in win && userAgent.indexOf( 'opera' ) !== -1 ) ? title : doc.title , url ) : null ;
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
                        try { jQuery( area ).html( jQuery( area , data ).add( jQuery( data ).filter( area ) ).html() ) ; } catch( err ) {} ;
                      } ;
                      if ( fire( settings.callbacks.update.content.after , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE_CONTENT ; } ;
                    } ;
                    
                    /* css */
                    function load_css() {
                      var filter = fn.filter ;
                      
                      UPDATE_CSS : {
                        if ( !settings.load.css ) { break UPDATE_CSS ; } ;
                        
                        if ( fire( settings.callbacks.update.css.before , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE_CSS ; } ;
                        
                        // 対象現行全要素に削除フラグを立てる。
                        jQuery( 'link[rel="stylesheet"], style' ).filter( function() { return jQuery.data( this , settings.nss.data , true ) ; } ) ;
                        // 対象移行全要素を走査する。
                        for ( var i = 0 , element , consistent ; element = css[ i ] ; i++ ) {
                          element = jQuery( element )[ 0 ] ;
                          consistent = false ;
                          
                          LINK : {
                            if( element.tagName.toUpperCase() !== 'LINK' ) { break LINK ; } ;
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
                            if( element.tagName.toUpperCase() !== 'STYLE' ) { break STYLE ; } ;
                            // 現行要素と移行要素を比較、一致するものがあれば次の走査へ移る。
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
                          
                          jQuery.data( jQuery( 'head' ).append( element ).children( ':last-child' ).get( 0 ) , settings.nss.data , false ) ;
                        } ;
                        jQuery( 'link[rel="stylesheet"], style' ).filter( function() { return jQuery.data( this , settings.nss.data ) ; } ).remove() ;
                        
                        if ( fire( settings.callbacks.update.css.after , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE_CSS ; } ;
                      } ; // label: UPDATE_CSS
                    } // function: css
                    settings.load.async.css === false ? load_css() : setTimeout( function() { load_css() ; } , settings.load.async.css ) ;
                    
                    /* script */
                    function load_script() {
                      var filter = fn.filter ;
                      
                      UPDATE_SCRIPT : {
                        if ( !settings.load.script ) { break UPDATE_SCRIPT ; } ;
                        
                        if ( fire( settings.callbacks.update.script.before , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE_SCRIPT ; } ;
                        
                        for ( var i = 0 , element , consistent ; element = script[ i ] ; i++ ) {
                          element = jQuery( element )[ 0 ] ;
                          consistent = false ;
                          
                          // 現行要素と移行要素を比較、一致するものがあれば次の走査へ移る。
                          if
                            (
                              jQuery( 'script[src]' ).filter( function() {
                                if ( consistent || this.src !== element.src ) { return false ; } ;
                                consistent = true ;
                                return true ;
                              } ).length
                          ) { continue ; } ;
                          
                          jQuery.data( jQuery( 'head' ).append( element ).children( ':last-child' ).get( 0 ) , settings.nss.data , false ) ;
                        } ;
                        
                        if ( fire( settings.callbacks.update.script.after , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE_SCRIPT ; } ;
                      } ; // label: UPDATE_SCRIPT
                    } // function: script
                    settings.load.async.script === false ? load_script() : setTimeout( function() { load_script() ; } , settings.load.async.script ) ;
                    
                    register && -1 < 'click,submit'.indexOf( event.type.toLowerCase() ) ? win.scrollTo( scrollX , scrollY ) : null ;
                    
                    if ( fire( settings.callbacks.update.success , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE ; } ;
                    if ( fire( settings.callbacks.update.complete , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE ; } ;
                    if ( fire( settings.callback , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE ; } ;
                  } catch( err ) {
                    if ( fire( settings.callbacks.update.error , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE ; } ;
                    if ( fire( settings.callbacks.update.complete , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE ; } ;
                    settings.fallback ? fallback( context ) : null ;
                  } ;
                  
                  if ( fire( settings.callbacks.update.after , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) === false ) { break UPDATE ; } ;
                } ; // label: UPDATE
                /* - done */
              } ,
              error : function( arg1 , arg2 , arg3 ) {
                XMLHttpRequest = arg1 ;
                textStatus = arg2 ;
                errorThrown = arg3 ;
                
                fire( settings.callbacks.ajax.error , context , [ event , settings.parameter , XMLHttpRequest , textStatus , errorThrown ] ) ;
                settings.fallback ? fallback( context , true ) : null ;
              }
            }
          )
        )
        /* - when */
      } // function: ajax_legacy
      /* - legacy support */
    } // function: ajax
    
    function fire( fn , context , args ) {
      if ( typeof fn === 'function' ) { return fn.apply( context , args ) ; } ;
    } // function: fire
    
    function wait( ms ) {
      var dfd = jQuery.Deferred() ;
      if ( !ms ) { return dfd.resolve( { fire : fire , filter : filter } ) ; } ;
      
      setTimeout( function() {
        dfd.resolve( { fire : fire , filter : filter } ) ;
      } , ms ) ;
      
      return dfd.promise() ; // function: wait
    } // function: wait
    
    function fallback( context ) {
      if ( context.tagName.toUpperCase() === 'A' ) {
        location = context.href ;
      } else if ( context.tagName.toUpperCase() === 'FORM' ) {
        context.submit() ;
      } else {
        location.reload() ;
      } ;
    } // function: fallback
    
    function filter( data , pattern ) {
      var regex , result ;
      regex = new RegExp( pattern , "gim" );
      result = data.match( regex )
      return result ;
    } // function: filter
    
    return this ; // function: pjax
  } // function: pjax
} )( jQuery )
