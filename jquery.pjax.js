/*
 * 
 * pjax
 * 
 * ---
 * @Copyright(c) 2012, falsandtru
 * @license MIT  http://opensource.org/licenses/mit-license.php  http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
 * @version 1.3.0
 * @updated 2013/01/16
 * @author falsandtru  http://fat.main.jp/  http://sa-kusaku.sakura.ne.jp/
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
 * 	area : 'div.pjax:not(.no-pjax)' ,
 * 	link : 'a.pjaxLinks' ,
 * 	scrollTop : null ,
 * 	scrollLeft : null ,
 * 	callback : callback ,
 * 	callbacks :
 * 	{
 * 		ajax :
 * 		{
 * 			beforeSend : function( arg , XMLHttpRequest ){ XMLHttpRequest.overrideMimeType( 'text/html;charset=UTF-8' ) ; }
 * 			error : error
 * 		}
 * 	}
 * 	wait : 100
 * }) ;
 *
 * function callback()
 * {
 * 	if( window._gaq ){ _gaq.push( ['_trackPageview'] ) ; }
 * }
 *
 * function error( arg , XMLHttpRequest )
 * {
 * 	alert( 'pjax cancel.\n' + XMLHttpRequest.status + ' ' + XMLHttpRequest.statusText ) ;
 * }
 * 
 */

( function( $ )
{
	
	jQuery.fn.pjax	= pjax ;
	jQuery.pjax			= pjax ;
	
	function pjax( options )
	{
		if( typeof this === 'function' ){ return arguments.callee.apply( jQuery( document ) , arguments ) ; }
		var
		defaults=
		{
			gns : 'pjax' ,
			ns : undefined ,
			area : undefined ,
			link : 'a[href^="/"]:not([target])[href$="/"] , a[href^="/"]:not([target])[href$=".html"] , a[href^="/"]:not([target])[href$=".htm"] , a[href^="/"]:not([target])[href$=".php"]' ,
			scrollTop : 0 ,
			scrollLeft : 0 ,
			ajax : {} ,
			callback : function(){} ,
			callbacks :
			{
				ajax : { dataFilter: function( event , arg , data ){ return data ; } } ,
				update : {}
			} ,
			parameter : undefined ,
			wait : 0 ,
			fallback : true
		} ,
		settings = jQuery.extend( true , {} , defaults , options ) ;
		
		
		if( !supportPushState() ){ return this ; }
		
		jQuery.extend
		(
			settings ,
			{
				nss :
				{
					click : [ 'click' , settings.gns + ( settings.ns === undefined ? '' : ':' + settings.ns ) ].join( '.' ) ,
					popstate : [ 'popstate' , settings.gns + ( settings.ns === undefined ? '' : ':' + settings.ns ) ].join( '.' )
				}
			}
		)
		
		jQuery( this )
		.undelegate( settings.link , settings.nss.click )
		.delegate( settings.link , settings.nss.click , settings , function( event )
		{
			if( event.which>1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ){ return this ; }
			if( location.protocol !== this.protocol || location.host !== this.host ){ return this ; }
			if( location.pathname === this.pathname && location.search === this.search && location.hash !== this.hash ){ return this ; }
			
			ajax.apply( this , [ event , this.href ,  location.pathname === this.pathname ? false : true , event.data ] ) ;
			
			event.preventDefault() ;
		} ) ;
		
		
		setTimeout( function()
		{
			jQuery( window )
			.unbind( settings.nss.popstate )
			.bind( settings.nss.popstate , settings , function( event )
			{
				ajax.apply( this , [ event , location.href , false , event.data ] ) ;
			} ) ;
		} , 100 ) ;
		
		/* function */
		
		function supportPushState()
		{
			return ( 'pushState' in window.history ) && ( window.history[ 'pushState' ] !== null ) ;
		}
		
		function supportReplaceState()
		{
			return ( 'replaceState' in window.history ) && ( window.history[ 'replaceState' ] !== null ) ;
		}
		
		function ajax( event , url , register , settings )
		{
			console.log(event)
			var
			data ,
			dataType ,
			XMLHttpRequest ,
			textStatus ,
			errorThrown ,
			title ,
			context = this ;
			
			fire( settings.callbacks.before , context , [ event , settings.parameter ] ) ;
			
			jQuery
			.when
			(
				wait( settings.wait ) ,
				jQuery.ajax
				(
					jQuery.extend
					(
						{} ,
						settings.ajax ,
						{
							url : url ,
							beforeSend : function( arg1 )
							{
								XMLHttpRequest = arg1 ;
								
								fire( settings.callbacks.ajax.beforeSend , context , [ event , settings.parameter , XMLHttpRequest ] ) ;
							} ,
							dataFilter : function( arg1 , arg2 )
							{
								data = arg1 ;
								dataType = arg2 ;
								
								return fire( settings.callbacks.ajax.dataFilter , context , [ event , settings.parameter , data , dataType ] ) ;
							} ,
							success : function( arg1 , arg2 )
							{
								data = arg1 ;
								dataType = arg2 ;
								
								title = jQuery( data ).filter( 'title' ).text() ;
								
								fire( settings.callbacks.ajax.success , context , [ event , settings.parameter , data , dataType ] ) ;
							} ,
							error : function( arg1 , arg2 , arg3 )
							{
								XMLHttpRequest = arg1 ;
								textStatus = arg2 ;
								errorThrown = arg3 ;
								
								fire( settings.callbacks.ajax.error , context , [ event , settings.parameter , XMLHttpRequest , textStatus , errorThrown ] ) ;
								settings.fallback ? fallback( context , true ) : null ;
							} ,
							complete : function( arg1 , arg2 )
							{
								XMLHttpRequest = arg1 ;
								textStatus = arg2 ;
								
								fire( settings.callbacks.ajax.complete , context , [ event , settings.parameter , XMLHttpRequest , textStatus ] ) ;
							}
						}
					)
				)
			)
			.done
			(
				function()
				{
					var
					areas = settings.area.split( ',' ) ,
					len1 = jQuery( settings.area ).length ,
					len2 = jQuery( settings.area , data ).length ;
					
					if( len1 && len2 && len1 === len2 )
					{
						if( register )
						{
							history.pushState( null , window.opera || ( 'userAgent' in window && userAgent.indexOf( 'opera' ) !== -1 ) ? title : document.title , url ) ;
							
							settings.scrollTop === null ? null : jQuery( 'html, body' ).scrollTop( parseInt( settings.scrollTop ) ) ;
							settings.scrollLeft === null ? null : jQuery( 'html, body' ).scrollLeft( parseInt( settings.scrollLeft ) ) ;
						}
						
						document.title = title ;
						for( var i = 0 ; i < areas.length ; i++ ){ jQuery( areas[ i ] ).html( jQuery( areas[ i ] , data ).html() ) ; }
						
						fire( settings.callback , context , [ event , settings.parameter , data , dataType ] ) ;
						fire( settings.callbacks.update.success , context , [ event , settings.parameter , data , dataType ] ) ;
						
						} else {
							
						fire( settings.callbacks.update.error , context , [ event , settings.parameter , data , dataType ] ) ;
						settings.fallback ? fallback( context , false ) : null ;
						
						return ;
					}
					
					fire( settings.callbacks.update.complete , context , [ event , settings.parameter , data , dataType ] ) ;
				}
			)
			.fail()
			.always
			(
				function()
				{
					fire( settings.callbacks.after , context, [ event , settings.parameter ] ) ;
				}
			)
		}
		
		function wait( ms )
		{
			if( !ms ){ return }
			
			var dfd = jQuery.Deferred() ;
			setTimeout( function()
			{
				dfd.resolve() ;
			} , ms ) ;
			return dfd.promise() ;
		}
		
		function fire( fn , context , args )
		{
			if( typeof fn === 'function' ){ return fn.apply( context , args ) ; }
		}
		
		function fallback( context , reload )
		{
			if( context.href !== undefined )
			{
				location = context.href ;
				}else if( reload ){
				location.reload() ;
			}
		}
		
		
		/* return */
		
		return this ;
	}
} )( jQuery )