/*
 * 
 * pjax
 * 
 * ---
 * @Copyright(c) 2012, falsandtru
 * @license MIT  http://opensource.org/licenses/mit-license.php  http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
 * @version 1.1.2
 * @updated 2013/01/12
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
 * 	callbacks : { when : { fail : fail } } ,
 * 	ajax :
 * 	{
 * 		beforeSend : function( xhr ){ xhr.overrideMimeType( "text/html;charset=UTF-8" ) ; },
 * 		timeout : 5000
 * 	} ,
 * 	wait : 100
 * }) ;
 *
 * function callback()
 * {
 * 	if( window._gaq ){ _gaq.push( ['_trackPageview'] ) ; }
 * }
 *
 * function fail(params, XMLHttpRequest)
 * {
 * 	//alert( 'ajax cancel.\n' + XMLHttpRequest.status + ' ' + XMLHttpRequest.statusText ) ;
 * 	location.href = this.href ;
 * }
 * 
 */

( function( $ )
{
	
	jQuery.fn.pjax	= pjax ;
	jQuery.pjax			= pjax ;
	
	function pjax( options )
	{
		if( typeof this == 'function' ){ return arguments.callee.apply( jQuery( window ) , arguments ) ; }
		var
		defaults=
		{
			gns : 'pjax' ,
			ns : 'default' ,
			area : undefined ,
			link : 'a[href^="/"]:not([target])[href$="/"] , a[href^="/"]:not([target])[href$=".html"] , a[href^="/"]:not([target])[href$=".htm"] , a[href^="/"]:not([target])[href$=".php"]' ,
			scrollTop : 0 ,
			scrollLeft : 0 ,
			ajax : {} ,
			callback : function(){} ,
			callbacks : { ajax : {} , when : {} } ,
			parameter : [] ,
			wait : 0
		} ,
		settings = jQuery.extend( true , {} , defaults , options ) ;
		
		
		if( !supportPushState() ){ return this ; }
		
		jQuery( this )
		.undelegate( settings.link , [ 'click' , settings.gns , settings.ns ].join( '.' ) )
		.delegate( settings.link , [ 'click' , settings.gns , settings.ns ].join( '.' ) , settings , function( event )
		{
			if( event.which>1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ){ return this ; }
			if( location.protocol != this.protocol || location.host != this.host ){ return this ; }
			if( location.pathname == this.pathname && location.search == this.search && location.hash != this.hash ){ return this ; }
			
			ajax.call( this , this.href ,  location.pathname == this.pathname ? false : true , event.data ) ;
			
			event.preventDefault() ;
			
		} ) ;
		
		
		setTimeout( function()
		{
			jQuery( window )
			.unbind( [ 'popstate' , settings.gns , settings.ns ].join( '.' ) )
			.bind( [ 'popstate' , settings.gns , settings.ns ].join( '.' ) , settings , function( event )
			{
				ajax.call( this , location.href , false , event.data )
				
			} ) ;
			
		} , 100 ) ;
		
		
		/* function */
		
		function supportPushState()
		{
			return ( 'pushState' in window.history ) && ( window.history[ 'pushState' ] != null ) ;
		}
		
		function supportReplaceState()
		{
			return ( 'replaceState' in window.history ) && ( window.history[ 'replaceState' ] != null ) ;
		}
		
		function ajax( url , register , settings )
		{
			var
			data ,
			dataType ,
			XMLHttpRequest ,
			textStatus ,
			errorThrown ,
			title ,
			context = this ;
			
			fire( settings.callbacks.before , context , [ settings.parameter ] ) ;
			
			jQuery
			.when
			(
				jQuery.ajax
				(
					jQuery.extend
					(
						{} ,
						settings.ajax ,
						{
							url : url ,
							success : function( arg1 , arg2 )
							{
								data = arg1 ;
								dataType = arg2 ;
								
								title = jQuery( data ).filter( 'title' ).text() ;
								
								fire( settings.callbacks.ajax.success , context , [ settings.parameter , data , dataType ] ) ;
							} ,
							error : function( arg1 , arg2 , arg3 )
							{
								XMLHttpRequest = arg1 ;
								textStatus = arg2 ;
								errorThrown = arg3 ;
								
								fire( settings.callbacks.ajax.error , context , [ settings.parameter , XMLHttpRequest , textStatus , errorThrown ] ) ;
							} ,
							complete : function( arg1 , arg2 )
							{
								XMLHttpRequest = arg1 ;
								textStatus = arg2 ;
								
								fire( settings.callbacks.ajax.complete , context , [ settings.parameter , XMLHttpRequest , textStatus ] ) ;
							}
						}
					)
				) ,
				wait( settings.wait )
			)
			.done
			(
				function()
				{
					var
					areas = settings.area.split( ',' ) ,
					len1 = jQuery( settings.area ).length ,
					len2 = jQuery( settings.area , data ).length ;
					
					if( len1 && len2 && len1 == len2 )
					{
						if( register )
						{
							history.pushState( null , window.opera || ( 'userAgent' in window && userAgent.indexOf( 'opera' ) != -1 ) ? title : document.title , url ) ;
							
							( isNaN( settings.scrollTop ) || settings.scrollTop == null ) ? null : jQuery( 'html, body' ).scrollTop( parseInt( settings.scrollTop ) ) ;
							( isNaN( settings.scrollLeft ) || settings.scrollLeft == null ) ? null : jQuery( 'html, body' ).scrollLeft( parseInt( settings.scrollLeft ) ) ;
							
						}
						
						document.title = title ;
						for( var i = 0 ; i < areas.length ; i++ ){ jQuery( areas[ i ] ).html( jQuery( areas[ i ] , data ).html() ) ; }
						
						fire( settings.callback , context , [ settings.parameter ] ) ;
						
						} else {
						location.href = url ;
						
					}
					
					fire( settings.callbacks.when.done , context , [ settings.parameter , data , dataType ] ) ;
				}
			)
			.fail
			(
				function()
				{
					fire( settings.callbacks.when.fail , context , [ settings.parameter , XMLHttpRequest , textStatus , errorThrown ] ) ;
				}
			)
			.always
			(
				function()
				{
					fire( settings.callbacks.when.always , context , [ settings.parameter , XMLHttpRequest , textStatus ] ) ;
				}
			) ;
			
			fire( settings.callbacks.after , context, [ settings.parameter , XMLHttpRequest , textStatus ] ) ;
			
		}
		
		function wait( ms )
		{
			var dfd = jQuery.Deferred() ;
			setTimeout( function()
			{
				dfd.resolve() ;
			} , ms ) ;
			return dfd.promise() ;
		}
		
		function fire( fn , context , params )
		{
			if( typeof fn == 'function' ){ fn.apply( context , params ) ; }
		}
		
		
		/* return */
		
		return this ;
	}
} )( jQuery )