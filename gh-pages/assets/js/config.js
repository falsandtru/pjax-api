(function(){
  var accessor = this;

  /* init
     ========================================================================== */
  $(this.init);
  this.init = this.clientenv;
  this.init = this.preload;
  this.init = this.pjax;
  this.init = this.visibilitytrigger;

  /* reset
     ========================================================================== */
  this.reset = function() {$(document).trigger('preload');};
  this.reset = this.visibilitytrigger;

  /* component
     ========================================================================== */

  /* clientenv
     -------------------------------------------------------------------------- */
  this.clientenv = function(){
    $.clientenv({ font: { lang: 'ja' } })
    .addClass('hardware platform os windowsXP:lte windowsXP:gt browser ie ie8:lte')
    .addClass('font', 'Meiryo, メイリオ', 'meiryo')
    .clientenv({not: false})
    .addClass('touch');
  };

  /* preload
     -------------------------------------------------------------------------- */
  this.preload = function(){
    if (/touch|tablet|mobile|phone|android|iphone|ipad|blackberry/i.test(window.navigator.userAgent)) {return;}
    
    $.preload({
      forward: $.pjax.follow,
      check: $.pjax.getCache,
      encode: true,
      ajax: {
        timeout: 2000,
        xhr: function() {
          var xhr = jQuery.ajaxSettings.xhr();

          $('div.loading').children().width('5%');
          if (xhr instanceof Object && 'onprogress' in xhr) {
            xhr.addEventListener('progress', function(event) {
              var percentage = event.total ? event.loaded / event.total : 0.4;
              percentage = percentage * 90 + 5;
              $('div.loading').children().width(percentage + '%');
            }, false);
            xhr.addEventListener('load', function(event) {
              $('div.loading').children().width('95%');
            }, false);
            xhr.addEventListener('error', function(event) {
              $('div.loading').children().css('background-color', '#00f');
            }, false);
          }
          return xhr;
        },
        success: function(data, textStatus, XMLHttpRequest) {
          !$.pjax.getCache(this.url) && $.pjax.setCache(this.url, null, textStatus, XMLHttpRequest);
        }
      }
    });
  };

  /* pjax
     -------------------------------------------------------------------------- */
  this.pjax = function(){
    $.pjax({
      area: ['#container', 'body'],
      scope: {
        test: '!*/[^/]+/test/',
        $test: null,
        '/': ['/', 'test']
      },
      callback: null,
      callbacks: {
        //async: true,
        before: function() {
          $('div.loading').children().width('');
          $('div.loading').fadeIn(0);
        },
        ajax: {
          xhr: function() {
            var xhr = jQuery.ajaxSettings.xhr();

            $('div.loading').children().width('5%');
            if (xhr instanceof Object && 'onprogress' in xhr) {
              xhr.addEventListener('progress', function(event) {
                var percentage = event.loaded / event.total;
                percentage = isFinite(percentage) ? percentage : 0.4;
                percentage = percentage * 90 + 5;
                $('div.loading').children().width(percentage + '%');
              }, false);
              xhr.addEventListener('loadend', function(event) {
              }, false);
            }
            return xhr;
          }
        },
        update: {
          before: function() {
            $('div.loading').children().width('95%');
          },
          content: {
            after: function() {
              $('div.loading').children().width('96.25%');
            }
          },
          css: {
            after: function() {
              $('div.loading').children().width('97.5%');
            }
          },
          script: {
            after: function() {
              $('div.loading').children().width('98.75%');
            }
          },
          render: {
            after: function () {
              $('div.loading').children().width('100%');
              $('div.loading').fadeOut(50);
            }
          }
        }
      },
      load: {
        head: 'base, meta, link',
        css: true,
        script: true
      },
      load: { css: true, script: true },
      cache: { click: true, submit: false, popstate: true },
      ajax: {cache: true, timeout: 5000},
      server: {query: null},
      speedcheck: true
    });

    $(document).bind('pjax:ready', accessor.reset);
  };

  /* visibilitytrigger
     -------------------------------------------------------------------------- */
  this.visibilitytrigger = function(){
    $.visibilitytrigger();

    $.vt({
      ns: "sh",
      trigger: "pre.sh",
      callback: function(){ SyntaxHighlighter && SyntaxHighlighter.highlight(SyntaxHighlighter.defaults,this); },
      ahead: [0, '*1'],
      step: 0,
      skip: true
    }).disable();

    $.vt({
      ns: 'iframe',
      trigger: '.delay-iframe',
      callback: function() {
        var iframe = $(this).next('noscript').text() || decodeURIComponent($(this).data('iframe'));
        iframe = iframe.replace(/#038;/g, '');
        iframe.width = Math.min(iframe.width, $(this).parent().width());
        $(this).html(iframe);
      },
      ahead: ['*0.5', '*1'],
      skip: true
    }).disable();

    $.vt.enable().vtrigger();
  };

  return this;
}).call(new FuncManager(
  [
    'init',
    'reset',
    'preload',
    'pjax',
    'visibilitytrigger',
    'clientenv'
  ]
).accessor);
