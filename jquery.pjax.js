/*
 * 
 * pjax
 * 
 * ---
 * @Copyright(c) 2012, FAT
 * @license MIT  http://opensource.org/licenses/mit-license.php  http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
 * @version -
 * @updated 2013/01/04
 * @author FAT  http://fat.main.jp/  http://sa-kusaku.sakura.ne.jp/
 * ---
 * Note: 
 * 
 * ---
 * Example:
 * @jquery 1.7.2
 * 
 * $.pjax({area: 'div.pjax:not(.no-pjax)'});
 * 
 */

( function( $ )
{
	jQuery.fn.pjax	= pjax ;
	jQuery.pjax			= pjax ;
	function pjax( options )
	{
		if(typeof this == 'function'){ return arguments.callee.apply( jQuery( window ) , arguments ) ; }
		var
		defaults=
		{
			gns : 'pjax' ,
			ns : 'default' ,
			area : undefined ,
			link : 'a[href^="/"]:not([target])[href$="/"] , a[href^="/"]:not([target])[href$=".html"] , a[href^="/"]:not([target])[href$=".htm"] , a[href^="/"]:not([target])[href$=".php"]' ,
			scrollTop : 0 ,
			scrollLeft : 0 ,
			fnBefore : function(){} ,
			callback : function(){} ,
			fnSuccess : function(){} ,
			fnError : function(){} ,
			fnDone : function(){} ,
			fnFail : function(){} ,
			fnAfter : function(){} ,
			parameters : {} ,
			wait : 0
		} ,
		setting = jQuery.extend( {} , defaults , options ) ;
		
		
		if( !supportPushState() ){ return this ; }
		
		jQuery( this )
		.undelegate( setting.link , [ 'click' , setting.gns , setting.ns ].join( '.' ) )
		.delegate( setting.link , [ 'click' , setting.gns , setting.ns ].join( '.' ) , setting , function( event )
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
			.unbind( [ 'popstate' , setting.gns , setting.ns ].join( '.' ) )
			.bind( [ 'popstate' , setting.gns , setting.ns ].join( '.' ) , setting , function( event )
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
		
		function ajax( url , register , setting )
		{
			var
			html ,
			title ,
			XMLHttpRequest ,
			textStatus ,
			errorThrown ,
			context = this ;
			
			setting.fnBefore.apply( context , setting.parameters.fnBefore ) ;
			
			jQuery
			.when
			(
				jQuery.ajax
				(
					{
						url : url ,
						cache : false ,
						timeout : setting.timeout ,
						success : function( data )
						{
							html = data ;
							title = jQuery( html ).filter( 'title' ).text() ;
							
							setting.fnSuccess.apply( context , [ setting.parameters , html ] ) ;
						} ,
						error : function( arg1 , arg2 , arg3 )
						{
							XMLHttpRequest = arg1 ;
							textStatus = arg2 ;
							errorThrown = arg3 ;
							
							setting.fnError.apply( context , [ setting.parameters , XMLHttpRequest , textStatus , errorThrown ] ) ;
						}
					}
				) ,
				wait( setting.wait )
			)
			.done
			(
				function()
				{
					var
					areas = setting.area.split( ',' ) ,
					len1 = jQuery( setting.area ).length ,
					len2 = jQuery( setting.area , html ).length ;
					
					if( len1 && len2 && len1 == len2 )
					{
						if( register )
						{
							history.pushState( null , window.opera || ( 'userAgent' in window && userAgent.indexOf( 'opera' ) != -1 ) ? title : document.title , url ) ;
							
							isNaN( setting.scrollTop ) ? null : jQuery( 'html, body' ).scrollTop( parseInt( setting.scrollTop ) ) ;
							isNaN( setting.scrollLeft ) ? null : jQuery( 'html, body' ).scrollLeft( parseInt( setting.scrollLeft ) ) ;
							
							if( window._gaq ){ _gaq.push( [ '_trackPageview' ] ) ; }
						}
						
						document.title = title ;
						for( var i = 0 ; i < areas.length ; i++ ){ jQuery( areas[ i ] ).html( jQuery( areas[ i ] , html ).html() ) ; }
						
						setting.callback.apply( context , [ setting.parameters ] ) ;
						
						} else {
						location.href = url ;
						
					}
					
					setting.fnDone.apply( context , [ setting.parameters ] ) ;
				}
			)
			.fail
			(
				function(){ setting.fnFail.apply( context , [ setting.parameters ] ) ; }
			)
			.always
			(
				function(){ setting.fnAfter.apply( context , [ setting.parameters ] ) ; }
			) ;
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
		
		
		/* return */
		
		return this ;
	}
} )( jQuery )