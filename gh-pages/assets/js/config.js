new Function().apply.apply(function (accessor) {
  var spec = accessor, initialize = true, always = true, finalize = false;

/* init
  ========================================================================== */
  $(spec.init);
  spec.init = spec.clientenv;
  spec.init = spec.preload;
  spec.init = spec.pjax;
  spec.init = spec.visibilitytrigger;
  spec.init = spec.manifest;
  spec.init = function () { initialize = false; };

/* component
  ========================================================================== */
  
/* clientenv
  -------------------------------------------------------------------------- */
  spec.clientenv = function () {
    if (initialize) {
      $.clientenv({ font: { lang: 'ja' } })
      .addClass('hardware platform os windowsXP:lte windowsXP:gt browser ie ie8:lte')
      .addClass('font', 'Meiryo, メイリオ', 'meiryo')
      .clientenv({ not: false })
      .addClass('touch');
    }
  };

/* preload
  -------------------------------------------------------------------------- */
  spec.preload = function () {
    if (/touch|tablet|mobile|phone|android|iphone|ipad|blackberry/i.test(window.navigator.userAgent)) { return; }
    
    if (initialize) {
      $.preload({
        forward: $.pjax.follow,
        check: $.pjax.getCache,
        encode: true,
        ajax: {
          timeout: 2000,
          xhr: function () {
            var xhr = jQuery.ajaxSettings.xhr();

            $('div.loading').children().width('5%');
            if (xhr instanceof Object && 'onprogress' in xhr) {
              xhr.addEventListener('progress', function (event) {
                var percentage = event.total ? event.loaded / event.total : 0.4;
                percentage = percentage * 90 + 5;
                $('div.loading').children().width(percentage + '%');
              }, false);
              xhr.addEventListener('load', function (event) {
                $('div.loading').children().width('95%');
              }, false);
              xhr.addEventListener('error', function (event) {
                $('div.loading').children().css('background-color', '#00f');
              }, false);
            }
            return xhr;
          },
          success: function (data, textStatus, XMLHttpRequest) {
            !$.pjax.getCache(this.url) && $.pjax.setCache(this.url, null, textStatus, XMLHttpRequest);
          }
        }
      });
    }
    
    if (always) {
      setTimeout(function () { $(document).trigger('preload'); }, 1000);
    }
  };

/* pjax
  -------------------------------------------------------------------------- */
  spec.pjax = function () {
    if (initialize) {
      $.pjax({
        area: ['#container', 'body'],
        rewrite: function (document) {
          $('#primary, #secondary', document).find('img').each(escapeImage);
          function escapeImage() {
            this.setAttribute('data-original', this.src);
            this.setAttribute('src', '/img/gray.gif');
          }

          $('#primary', document).find('iframe').each(escapeIframe);
          function escapeIframe() {
            this.setAttribute('data-original', this.src);
            this.setAttribute('src', 'javascript:false');
          }
        },
        load: { css: true, script: true },
        cache: { click: true, submit: false, popstate: true },
        ajax: { cache: true, timeout: 3000 },
        scope: {
          test: '!*/[^/]+/test/',
          '/': ['/', '#test']
        },
        callbacks: {
          ajax: {
            xhr: function () {
              var xhr = jQuery.ajaxSettings.xhr();

              $('div.loading').children().width('5%');
              if (xhr instanceof Object && 'onprogress' in xhr) {
                xhr.addEventListener('progress', function (event) {
                  var percentage = event.loaded / event.total;
                  percentage = isFinite(percentage) ? percentage : 0.4;
                  percentage = percentage * 90 + 5;
                  $('div.loading').children().width(percentage + '%');
                }, false);
                xhr.addEventListener('loadend', function (event) {
                }, false);
              }
              return xhr;
            }
          },
          update: {
            url: {
              after: function () {
                $('div.loading').children().width('95%');
              }
            },
            head: {
              after: function () {
                $('div.loading').children().width('96.25%');
              }
            },
            content: {
              after: function () {
                $('div.loading').children().width('97.5%');
              }
            },
            css: {
              after: function () {
                $('div.loading').children().width('98.75%');
              }
            },
            script: {
              after: function () {
                $('div.loading').children().width('100%');
              }
            }
          }
        },
        load: {
          head: 'base, meta, link',
          css: true,
          script: true
        },
        speedcheck: true
      });
      
      $(document).bind('pjax:ready', spec.init);
      $(document).bind('pjax:fetch', function () {
        $('div.loading').children().width('');
        $('div.loading').fadeIn(0);
      });
      $(document).bind('pjax:render', function () {
        $('div.loading').children().width('100%');
        $('div.loading').fadeOut(50);
      });
    }
  };

/* visibilitytrigger
  -------------------------------------------------------------------------- */
  spec.visibilitytrigger = function () {
    if (always) {
      $.visibilitytrigger
      .open({
        ns: '.img.primary',
        trigger: '#primary img[data-original]',
        handler: function () { this.src = this.getAttribute('data-original'); },
        ahead: [0, .1],
        skip: true
      })
      .open({
        ns: '.img.secondary',
        trigger: '#secondary img[data-original]',
        handler: function () { this.src = this.getAttribute('data-original'); },
        ahead: [0, .1],
        skip: true
      })
      .open({
        ns: '.iframe.primary',
        trigger: '#primary iframe[data-original]',
        handler: function () { this.src = this.getAttribute('data-original'); },
        ahead: [0, .1],
        skip: true
      })
      .open({
        ns: ".sh.primary",
        trigger: "#primary pre.sh",
        handler: function () { SyntaxHighlighter && SyntaxHighlighter.highlight(SyntaxHighlighter.defaults, this); },
        ahead: [0, .1],
        step: 0,
        skip: true
      })
      .disable().enable('img').vtrigger();

      setTimeout(function () { $.vt.enable().vtrigger(); }, 20);
    }
  };
  
/* manifest
  -------------------------------------------------------------------------- */
  spec.manifest = function () {
    if (typeof applicationCache !== 'object' || !applicationCache) { return; }

    var appCache = window.applicationCache;

    if (initialize) {
      $.each(['checking', 'cached', 'downloading', 'error', 'noupdate', 'obsolete', 'progress', 'updateready'], function (i, type) {
        appCache.addEventListener(type, handler, false);
      });
    }

    function handler() {
      switch (appCache.status) {
        case appCache.UNCACHED:    // UNCACHED    == 0
          break;
        case appCache.IDLE:        // IDLE        == 1
          break;
        case appCache.CHECKING:    // CHECKING    == 2
          break;
        case appCache.DOWNLOADING: // DOWNLOADING == 3
          break;
        case appCache.UPDATEREADY: // UPDATEREADY == 4
          appCache.swapCache();
          //confirm('Please reload this page because a new version of this site is available. Reload it now?') &&
          window.location.reload();
          break;
        case appCache.OBSOLETE:    // OBSOLETE    == 5
          break;
        default:
          break;
      }
    }
  };

  return this;
},
FuncManager([
  'init',
  'preload',
  'pjax',
  'visibilitytrigger',
  'clientenv',
  'manifest'
]).contextArguments);
