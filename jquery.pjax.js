/*
 * 
 * pjax
 * 
 * ---
 * @Copyright(c) 2012, falsandtru
 * @license MIT  http://opensource.org/licenses/mit-license.php  http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
 * @version 1.5.5
 * @updated 2013/04/01
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
		if( !supportPushState() ){ return this ; }
		
		var
		defaults=
		{
			gns : 'pjax' ,
			ns : undefined ,
			area : undefined ,
			link : 'a:not([target])[href^="/"]' ,
			form : undefined ,
			scrollTop : 0 ,
			scrollLeft : 0 ,
			ajax : {} ,
			callback : function(){} ,
			callbacks : { ajax : {} , update : { title : {} , content : {} , css : {} , script : {} } } ,
			parameter : undefined ,
			load : { css : false , script : false } ,
			wait : 0 ,
			fallback : true
		} ,
		settings = jQuery.extend( true , {} , defaults , options ) ;
		
		jQuery.extend
		(
			true ,
			settings ,
			{
				nss :
				{
					click : [ 'click' , settings.gns + ( settings.ns === undefined ? '' : ':' + settings.ns ) ].join( '.' ) ,
					submit : [ 'submit' , settings.gns + ( settings.ns === undefined ? '' : ':' + settings.ns ) ].join( '.' ) ,
					popstate : [ 'popstate' , settings.gns + ( settings.ns === undefined ? '' : ':' + settings.ns ) ].join( '.' ) ,
					data : settings.gns + ( settings.ns === undefined ? '' : '.' + settings.ns ) ,
					requestHeader : [ 'X' , settings.gns.replace( /^(\w)/ , function( $1 ){ return $1.toUpperCase() ; } ) ].join( '-' )
				}
			}
		) ;
		
		if( !jQuery( settings.area ).length ){ return this ; } // function: pjax
		
		delegate_click :
		{
			if( settings.link === undefined ){ break delegate_click ; }
			if( settings.form !== undefined ){ break delegate_click ; }
			
			jQuery( this )
			.undelegate( settings.link , settings.nss.click )
			.delegate( settings.link , settings.nss.click , settings , function( event )
			{
				if( event.which>1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ){ return this ; }
				if( location.protocol !== this.protocol || location.host !== this.host ){ return this ; }
				if( location.pathname === this.pathname && location.search === this.search && location.hash !== this.hash ){ return this ; }
				if( location.pathname + location.search + location.hash === this.pathname + this.search + this.hash ){ event.preventDefault() ; return this ; }
				
				ajax.apply( this , [ event , this.href , true , event.data ] ) ;
				
				event.preventDefault() ;
			} ) ;
		} // label: delegate_click
		
		delegate_submit :
		{
			if( settings.form === undefined ){ break delegate_submit ; }
			
			jQuery( this )
			.undelegate( settings.form , settings.nss.submit )
			.delegate( settings.form , settings.nss.submit , settings , function( event )
			{
				ajax.apply( this , [ event , jQuery( event.target ).attr( 'action' ) , true , event.data ] ) ;
				
				event.preventDefault() ;
			} ) ;
		} // label: delegate_submit
		
		bind_popstate :
		{
			setTimeout( function()
			{
				jQuery( window )
				.unbind( settings.nss.popstate )
				.bind( settings.nss.popstate , settings , function( event )
				{
					ajax.apply( this , [ event , location.href , false , event.data ] ) ;
				} ) ;
			} , 100 ) ;
		} // label: bind_popstate
		
		
		/* function */
		
		function supportPushState()
		{
			return ( 'pushState' in window.history ) && ( window.history[ 'pushState' ] !== null ) ;
		} // function: supportPushState
		
		function ajax( event , url , register , settings )
		{
			var
			data ,
			dataType ,
			XMLHttpRequest ,
			textStatus ,
			errorThrown ,
			title ,
			context = this ,
			query = [] ,
			request = [] ,
			callbacks =
			{
				dataFilter : function( arg1 , arg2 )
				{
					data = arg1 ;
					dataType = arg2 ;
					
					return fire( settings.callbacks.ajax.dataFilter , context , [ event , settings.parameter , data , dataType ] ) ;
				} ,
				complete : function( arg1 , arg2 )
				{
					XMLHttpRequest = arg1 ;
					textStatus = arg2 ;
					
					fire( settings.callbacks.ajax.complete , context , [ event , settings.parameter , XMLHttpRequest , textStatus ] ) ;
				}
			} ;
			
			for( var i in callbacks )
			{
				if( i in settings.callbacks.ajax ){ continue ; }
				delete callbacks[ i ] ;
			}
			
			POPSTATE :
			{
				if( event.type.toLowerCase() !== 'popstate' ){ break POPSTATE ;}
				
				GET :
				{
					query = url.match( /\?[^\s]*/ ) ;
					if( query === null || query[ 0 ] === '?' ){ break GET ; }
					query = query[ 0 ].slice( 1 ).split( '&' ) ;
					request = [] ;
					for( var i = 0 ; i < query.length ; i++ )
					{
						request[ i ] = 0 ; // cannot null, undefined, {}
						request[ i ][ decodeURIComponent( query[ i ].split( '=' )[ 0 ] ) ] = decodeURIComponent( query[ i ].split( '=' )[ 1 ] ) ;
					}
					
					jQuery.extend
					(
						true ,
						settings ,
						{
							ajax :
							{
								type : 'GET' ,
								data : request
							}
						}
					) ;
				}
			}
			
			SUBMIT :
			{
				if( event.type.toLowerCase() !== 'submit' ){ break SUBMIT ;}
				
				url = url.replace( /\?[^\s]*/ , '' ) ;
				
				jQuery.extend
				(
					true ,
					settings ,
					{
						ajax :
						{
							type : jQuery( event.target ).attr( 'method' ).toUpperCase() ,
							data : jQuery( event.target ).serializeArray()
						}
					}
				) ;
				
				GET :
				{
					if( settings.ajax.type !== 'GET' ){ break GET ;}
					
					url += '?' + jQuery( event.target ).serialize() ;
				}
			}
			
			fire( settings.callbacks.before , context , [ event , settings.parameter ] ) ;
			
			switch( jQuery().jquery )
			{
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
			}
			
			
			/* ajax function */
			
			function ajax_regular(){
				jQuery
				.when
				(
					wait( settings.wait ) ,
					jQuery.ajax
					(
						jQuery.extend
						(
							true ,
							{} ,
							settings.ajax ,
							callbacks ,
							{
								url : url ,
								beforeSend : function( arg1 )
								{
									XMLHttpRequest = arg1 ;
									
									XMLHttpRequest.setRequestHeader( settings.nss.requestHeader , 'true' ) ;
									XMLHttpRequest.setRequestHeader( settings.nss.requestHeader + '-Area' , settings.area ) ;
									XMLHttpRequest.setRequestHeader( settings.nss.requestHeader + '-CSS' , settings.load.css ) ;
									XMLHttpRequest.setRequestHeader( settings.nss.requestHeader + '-Script' , settings.load.script ) ;
									
									fire( settings.callbacks.ajax.beforeSend , context , [ event , settings.parameter , XMLHttpRequest ] ) ;
								} ,
								success : function( arg1 , arg2 , arg3 )
								{
									data = arg1 ;
									dataType = arg2 ;
									XMLHttpRequest = arg3 ;
									
									fire( settings.callbacks.ajax.success , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) ;
								} ,
								error : function( arg1 , arg2 , arg3 )
								{
									XMLHttpRequest = arg1 ;
									textStatus = arg2 ;
									errorThrown = arg3 ;
									
									fire( settings.callbacks.ajax.error , context , [ event , settings.parameter , XMLHttpRequest , textStatus , errorThrown ] ) ;
									settings.fallback ? fallback( context , true ) : null ;
								}
							}
						)
					)
				)
				.done
				(
					function()
					{
						try
						{
							if( XMLHttpRequest.getResponseHeader( 'Content-Type' ).indexOf( 'text/html' ) === -1 ){ throw null ; }
							
							var
							title = jQuery( data ).filter( 'title' ).text() ,
							css = jQuery( data ).filter( 'link[rel="stylesheet"], style' ) ,
							script = jQuery( data ).filter( 'script' ) ,
							areas = settings.area.split( ',' ) ,
							scrollX = settings.scrollLeft === null ? jQuery( window ).scrollLeft() : parseInt( settings.scrollLeft ) ,
							scrollY = settings.scrollTop === null ? jQuery( window ).scrollTop() : parseInt( settings.scrollTop ) ,
							len1 = jQuery( settings.area ).length ,
							len2 = jQuery( settings.area , data ).add( jQuery( data ).filter( settings.area ) ).length ;
							
							fire( settings.callbacks.update.before , context , [ event , settings.parameter , data , dataType ] ) ;
							
							if( len1 && len1 === len2 )
							{
								register ? history.pushState( null , window.opera || ( 'userAgent' in window && userAgent.indexOf( 'opera' ) !== -1 ) ? title : document.title , url ) : null ;
								
								/* title */
								fire( settings.callbacks.update.title.before , context , [ event , settings.parameter , data , dataType ] ) ;
								document.title = title ;
								fire( settings.callbacks.update.title.after , context , [ event , settings.parameter , data , dataType ] ) ;
								
								/* content */
								fire( settings.callbacks.update.content.before , context , [ event , settings.parameter , data , dataType ] ) ;
								for( var i = 0 ; i < areas.length ; i++ ){ jQuery( areas[ i ] ).html( jQuery( areas[ i ] , data ).add( jQuery( data ).filter( areas[ i ] ) ).html() ) ; }
								fire( settings.callbacks.update.content.after , context , [ event , settings.parameter , data , dataType ] ) ;
								
								/* css */
								css :
								{
									if( !settings.load.css ){ break css ; }
									
									fire( settings.callbacks.update.css.before , context , [ event , settings.parameter , data , dataType ] ) ;
									
									jQuery( 'link[rel="stylesheet"], style' ).filter( function(){ return !jQuery.data( this , settings.nss.data , true ) ; } ) ;
									for( var i = 0 ; i < css.length ; i++ )
									{
										if
										(
											jQuery( 'link[rel="stylesheet"]' ).filter( function()
											{
												if( this.href === css[ i ].href )
												{
													jQuery.data( this , settings.nss.data ) ? jQuery.data( this , settings.nss.data , false ) : null ;
													return true ;
												}
												return false ;
											} ).length
										){ continue ; }
										
										if
										(
											jQuery( 'style' ).filter( function()
											{
												if( this.innerHTML.replace(/^\s+|\s+$|\n/gm,'') === css[ i ].innerHTML.replace(/^\s+|\s+$|\n/gm,'') )
												{
													jQuery.data( this , settings.nss.data ) ? jQuery.data( this , settings.nss.data , false ) : null ;
													return true ;
												}
												return false ;
											} ).length
										){ continue ; }
										jQuery.data( jQuery( 'head' ).append( jQuery( css[ i ].outerHTML ) ).children( ':last-child' ).get( 0 ) , settings.nss.data , false ) ;
									}
									jQuery( 'link[rel="stylesheet"], style' ).filter( function(){ return jQuery.data( this , settings.nss.data ) ; } ).remove() ;
									
									fire( settings.callbacks.update.css.after , context , [ event , settings.parameter , data , dataType ] ) ;
								} // label: css
								
								/* script */
								script :
								{
									if( !settings.load.script ){ break script ; }
									
									fire( settings.callbacks.update.script.before , context , [ event , settings.parameter , data , dataType ] ) ;
									
									for( var i = 0 ; i < script.length ; i++ )
									{
										if
										(
											jQuery( 'script[src]' ).filter( function()
											{
												if( this.src === script[ i ].src )
												{
													return true ;
												}
												return false ;
											} ).length
										){ continue ; }
										jQuery.data( jQuery( 'head' ).append( jQuery( script[ i ].outerHTML ) ).children( ':last-child' ).get( 0 ) , settings.nss.data , false ) ;
									}
									
									fire( settings.callbacks.update.script.after , context , [ event , settings.parameter , data , dataType ] ) ;
								} // label: script
								
								register && event.type === 'click' ? window.scrollTo( scrollX , scrollY ) : null ;
								
								fire( settings.callbacks.update.success , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) ;
								fire( settings.callback , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) ;
							}
							else
							{
								fire( settings.callbacks.update.error , context , [ event , settings.parameter , data , dataType ] ) ;
								settings.fallback ? fallback( context , false ) : null ;
							}
						
							fire( settings.callbacks.update.complete , context , [ event , settings.parameter , data , dataType ] ) ;
							fire( settings.callbacks.update.after , context , [ event , settings.parameter , data , dataType ] ) ;
						}
						catch( err )
						{
							fire( settings.callbacks.update.error , context , [ event , settings.parameter , data , dataType ] ) ;
							settings.fallback ? fallback( context , false ) : null ;
						}
					}
				)
				.fail()
				.always
				(
					function()
					{
						fire( settings.callbacks.after , context, [ event , settings.parameter ] ) ;
					}
				) ;
			} // function: ajax_regular
			
			/* + legacy support */
			function ajax_legacy()
			{
				/* + when */
				jQuery.ajax
				(
					jQuery.extend
					(
						true ,
						{} ,
						settings.ajax ,
						callbacks ,
						{
							url : url ,
							beforeSend : function( arg1 )
							{
								XMLHttpRequest = arg1 ;
								
								XMLHttpRequest.setRequestHeader( settings.nss.requestHeader , 'true' ) ;
								XMLHttpRequest.setRequestHeader( settings.nss.requestHeader + '-Area' , settings.area ) ;
								XMLHttpRequest.setRequestHeader( settings.nss.requestHeader + '-CSS' , settings.load.css ) ;
								XMLHttpRequest.setRequestHeader( settings.nss.requestHeader + '-Script' , settings.load.script ) ;
								
								fire( settings.callbacks.ajax.beforeSend , context , [ event , settings.parameter , XMLHttpRequest ] ) ;
							} ,
							success : function( arg1 , arg2 , arg3 )
							{
								data = arg1 ;
								dataType = arg2 ;
								XMLHttpRequest = arg3 ;
								
								fire( settings.callbacks.ajax.success , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) ;
								
								if( XMLHttpRequest.status === 200 )
								{
									/* + done */
									try
									{
										if( XMLHttpRequest.getResponseHeader( 'Content-Type' ).indexOf( 'text/html' ) === -1 ){ throw null ; }
										
										var
										title = jQuery( data ).filter( 'title' ).text() ,
										css = jQuery( data ).filter( 'link[rel="stylesheet"], style' ) ,
										script = jQuery( data ).filter( 'script' ) ,
										areas = settings.area.split( ',' ) ,
										scrollX = settings.scrollLeft === null ? jQuery( window ).scrollLeft() : parseInt( settings.scrollLeft ) ,
										scrollY = settings.scrollTop === null ? jQuery( window ).scrollTop() : parseInt( settings.scrollTop ) ,
										len1 = jQuery( settings.area ).length ,
										len2 = jQuery( settings.area , data ).add( jQuery( data ).filter( settings.area ) ).length ;
											
										fire( settings.callbacks.update.before , context , [ event , settings.parameter , data , dataType ] ) ;
										
										if( len1 && len1 === len2 )
										{
											register ? history.pushState( null , window.opera || ( 'userAgent' in window && userAgent.indexOf( 'opera' ) !== -1 ) ? title : document.title , url ) : null ;
											
											/* title */
											fire( settings.callbacks.update.title.before , context , [ event , settings.parameter , data , dataType ] ) ;
											document.title = title ;
											fire( settings.callbacks.update.title.after , context , [ event , settings.parameter , data , dataType ] ) ;
											
											/* content */
											fire( settings.callbacks.update.content.before , context , [ event , settings.parameter , data , dataType ] ) ;
											for( var i = 0 ; i < areas.length ; i++ ){ jQuery( areas[ i ] ).html( jQuery( areas[ i ] , data ).add( jQuery( data ).filter( areas[ i ] ) ).html() ) ; }
											fire( settings.callbacks.update.content.after , context , [ event , settings.parameter , data , dataType ] ) ;
											
											/* css */
											css :
											{
												if( !settings.load.css ){ break css ; }
												
												fire( settings.callbacks.update.css.before , context , [ event , settings.parameter , data , dataType ] ) ;
												
												jQuery( 'link[rel="stylesheet"], style' ).filter( function(){ return jQuery.data( this , settings.nss.data , true ) ; } ) ;
												for( var i = 0 ; i < css.length ; i++ )
												{
													if
													(
														jQuery( 'link[rel="stylesheet"]' ).filter( function()
														{
															if( this.href === css[ i ].href )
															{
																jQuery.data( this , settings.nss.data ) ? jQuery.data( this , settings.nss.data , false ) : null ;
																return true ;
															}
															return false ;
														} ).length
													){ continue ; }
													
													if
													(
														jQuery( 'style' ).filter( function()
														{
															if( this.innerHTML.replace(/^\s+|\s+$|\n/gm,'') === css[ i ].innerHTML.replace(/^\s+|\s+$|\n/gm,'') )
															{
																jQuery.data( this , settings.nss.data ) ? jQuery.data( this , settings.nss.data , false ) : null ;
																return true ;
															}
															return false ;
														} ).length
													){ continue ; }
													jQuery.data( jQuery( 'head' ).append( jQuery( css[ i ].outerHTML ) ).children( ':last-child' ).get( 0 ) , settings.nss.data , false ) ;
												}
												jQuery( 'link[rel="stylesheet"], style' ).filter( function(){ return jQuery.data( this , settings.nss.data ) ; } ).remove() ;
												
												fire( settings.callbacks.update.css.after , context , [ event , settings.parameter , data , dataType ] ) ;
											} // label: css
											
											/* script */
											script :
											{
												if( !settings.load.script ){ break script ; }
												
												fire( settings.callbacks.update.script.before , context , [ event , settings.parameter , data , dataType ] ) ;
												
												for( var i = 0 ; i < script.length ; i++ )
												{
													if
													(
														jQuery( 'script[src]' ).filter( function()
														{
															if( this.src === script[ i ].src )
															{
																return true ;
															}
															return false ;
														} ).length
													){ continue ; }
													jQuery.data( jQuery( 'head' ).append( jQuery( script[ i ].outerHTML ) ).children( ':last-child' ).get( 0 ) , settings.nss.data , false ) ;
												}
												
												fire( settings.callbacks.update.script.after , context , [ event , settings.parameter , data , dataType ] ) ;
											} // label: script
											
											register && event.type === 'click' ? window.scrollTo( scrollX , scrollY ) : null ;
											
											fire( settings.callbacks.update.success , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) ;
											fire( settings.callback , context , [ event , settings.parameter , data , dataType , XMLHttpRequest ] ) ;
										}
										else
										{
											fire( settings.callbacks.update.error , context , [ event , settings.parameter , data , dataType ] ) ;
											settings.fallback ? fallback( context , false ) : null ;
										}
									
										fire( settings.callbacks.update.complete , context , [ event , settings.parameter , data , dataType ] ) ;
										fire( settings.callbacks.update.after , context , [ event , settings.parameter , data , dataType ] ) ;
									}
									catch( err )
									{
										fire( settings.callbacks.update.error , context , [ event , settings.parameter , data , dataType ] ) ;
										settings.fallback ? fallback( context , false ) : null ;
									}
									/* - done */
								}
							} ,
							error : function( arg1 , arg2 , arg3 )
							{
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
				
				fire( settings.callbacks.after , context, [ event , settings.parameter ] ) ;
			} // function: ajax_legacy
			/* - legacy support */
		} // function: ajax
		
		function wait( ms )
		{
			if( !ms ){ return }
			
			var dfd = jQuery.Deferred() ;
			setTimeout( function()
			{
				dfd.resolve() ;
			} , ms ) ;
			return dfd.promise() ; // function: wait
		} // function: wait
		
		function fire( fn , context , args )
		{
			if( typeof fn === 'function' ){ return fn.apply( context , args ) ; }
		} // function: fire
		
		function fallback( context , reload )
		{
			if( context.href !== undefined )
			{
				location = context.href ;
			}
			else if( reload )
			{
				location.reload() ;
			}
		} // function: fallback
		
		return this ; // function: pjax
	} // function: pjax
} )( jQuery )