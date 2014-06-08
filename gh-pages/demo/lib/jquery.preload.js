/*
 * 
 * preload
 * 
 * ---
 * @Copyright(c) 2014, falsandtru
 * @license MIT http://opensource.org/licenses/mit-license.php
 * @version 0.2.2
 * @updated 2014/06/08
 * @author falsandtru https://github.com/falsandtru/
 * @CodingConventions Google JavaScript Style Guide
 * ---
 * Note: 
 * 
 * ---
 * Example:
 * @jquery 1.7.2
 * 
 * $.preload();
 * $('.container').preload();
 * 
 */

(function(jQuery, window, document, undefined) {
  
  var Store;
  
  function registrate(jQuery, window, document, undefined, Store) {
    jQuery.fn[Store.name] = jQuery[Store.name] = function() {
      
      return initialize.apply(this, [
        jQuery, window, document, undefined, Store
      ].concat([].slice.call(arguments)));
    };
    Store.setProperties.call(jQuery[Store.name]);
  }
  
  function initialize(jQuery, window, document, undefined, Store, option) {
    
    var $context = this;
    
    // polymorphism
    switch (true) {
      case typeof option === 'string':
        option = {link: option};
        
      default:
        $context = $context instanceof jQuery ? $context : jQuery(document);
        $context = Store.setProperties.call($context, null, null);
    }
    
    // setting
    var setting;
    setting = jQuery.extend(true,
      {
        gns: Store.name,
        ns: undefined,
        observe: true,
        link: 'a:not([target])',
        filter: function(){return /(\/[^.]*|\.html?|\.php)([#?].*)?$/.test(this.href);},
        lock: 1000,
        forward: null,
        check: null,
        interval: 1000,
        limit: 2,
        cooldown: 10000,
        skip: 50,
        query: null,
        encode: false,
        prefetch: null, //'link[rel~="dns-prefetch"], link[rel~="icon"], link[rel~="stylesheet"], script[src], .prefetch:lt(3)',
        ajax: {dataType: 'text', async: true, timeout: 1500}
      },
      option
    );
    
    setting.nss = {
      array: [Store.name].concat(setting.ns && String(setting.ns).split('.') || [])
    };
    jQuery.extend
    (
      true,
      setting = setting.scope && Store.scope(setting) || setting,
      {
        id: 0,
        nss: {
          name: setting.ns || '',
          alias: Store.alias ? [Store.alias].concat(setting.nss.array.slice(1)).join('.') : false,
          event: setting.nss.array.join('.'),
          data: setting.nss.array.join('-'),
          class4html: setting.nss.array.join('-'),
          click: ['click'].concat(setting.nss.array.join(':')).join('.'),
          mousemove: ['mousemove'].concat(setting.nss.array.join(':')).join('.'),
          mouseover: ['mouseover'].concat(setting.nss.array.join(':')).join('.'),
          mouseout: ['mouseout'].concat(setting.nss.array.join(':')).join('.'),
          touchstart: ['touchstart'].concat(setting.nss.array.join(':')).join('.'),
          touchmove: ['touchmove'].concat(setting.nss.array.join(':')).join('.'),
          touchend: ['touchend'].concat(setting.nss.array.join(':')).join('.')
        },
        target: null,
        volume: 0,
        points: [],
        touch: false,
        queue: [],
        xhr: null,
        ajax: jQuery.extend(true, {}, jQuery.ajaxSettings, setting.ajax),
        timeStamp: 0,
        option: option
      }
    );
    
    // registrate
    jQuery(function() {Store.registrate.call($context, jQuery, window, document, undefined, Store, setting)});
    
    return $context; // function: pjax
  }
  
  Store = {
    name: 'preload',
    alias: '',
    ids: [],
    settings: [0],
    count: 0,
    disable: false,
    setAlias:  function(name) {
      Store.alias = typeof name === 'string' ? name : Store.alias;
      if (Store.name !== Store.alias && !jQuery[Store.alias]) {
        jQuery[Store.name][Store.alias] = jQuery.fn[Store.name];
        jQuery.fn[Store.alias] = jQuery[Store.alias] = jQuery.fn[Store.name];
      }
    },
    setProperties: function(namespace, element) {
      
      var $context = this;
      
      if ($context instanceof jQuery || $context === jQuery[Store.name]) {
        
        $context = $context instanceof jQuery && element !== undefined ? $context.add(element) : $context;
        
        $context[Store.name] = jQuery[Store.name];
        
        $context.enable = function() {
          Store.disable = false;
        };
        
        $context.disable = function() {
          Store.disable = true;
        };
      }
      return $context;
    },
    req: {},
    loaded: {},
    registrate: function(jQuery, window, document, undefined, Store, setting) {
      
      var $context, events;
      $context = this;
      
      setting.id = Store.settings.length;
      Store.ids.push(setting.id);
      Store.settings[setting.id] = setting;
      
      var url = setting.encode ? Store.canonicalizeURL(window.location.href) : window.location.href;
      Store.loaded[url.replace(/#.*/, '')] = true;
      
      jQuery(document)
      .unbind(setting.nss.event)
      .bind(setting.nss.event, function(event) {
        setting.volume = 0;
        setting.timeStamp = 0;
        
        $context.find(event.target).add($context.filter(event.target))
        .find(setting.link).filter(setting.filter)
        .unbind(setting.nss.click)
        .one(setting.nss.click, setting.id, function(event) {
          if (Store.disable) {return;}
          
          var setting = Store.settings[event.data];
          
          event.timeStamp = new Date().getTime();
          if (setting.encode) {'href' in this ? this.href = Store.getURL(setting, this) : this.src = Store.getURL(setting, this);}
          switch (!event.isDefaultPrevented() && jQuery.data(event.currentTarget, setting.nss.data)) {
            case 'preload':
            case 'lock':
              if (setting.forward) {
                // forward
                var url = Store.getURL(setting, event.currentTarget);
                if (false === Store.fire(setting.forward, null, [event, setting.xhr, setting.timeStamp])) {
                  // forward fail
                  if ('lock' === jQuery.data(event.currentTarget, setting.nss.data)) {
                    // lock
                    event.preventDefault();
                  } else {
                    // preload
                    Store.click(setting, event);
                    jQuery.removeData(event.currentTarget, setting.nss.data);
                  }
                } else {
                  // forward success
                  event.preventDefault();
                  jQuery.removeData(event.currentTarget, setting.nss.data);
                }
              } else {
                // not forward
                if ('lock' === jQuery.data(event.currentTarget, setting.nss.data)) {
                  // lock
                  event.preventDefault();
                } else {
                  // preload
                  Store.click(setting, event);
                  jQuery.removeData(event.currentTarget, setting.nss.data);
                }
              }
              break;
            default:
              setting.xhr && setting.xhr.readyState < 4 && setting.xhr.abort();
          }
        })
        .unbind(setting.nss.mouseover)
        .bind(setting.nss.mouseover, setting.id, function(event) {
          var setting = Store.settings[event.data];
          setting.target = this;
        })
        .unbind(setting.nss.mouseout)
        .bind(setting.nss.mouseout, setting.id, function(event) {
          var setting = Store.settings[event.data];
          setting.target = null;
        })
        .unbind(setting.nss.mousemove)
        .bind(setting.nss.mousemove, setting.id, function(event) {
          var setting = Store.settings[event.data];
          
          event.timeStamp = new Date().getTime();
          setting.points.unshift(event);
          setting.points.splice(10, 1);
          Store.check(setting, event, setting.target);
        })/*
        .unbind(setting.nss.touchstart)
        .bind(setting.nss.touchstart, setting.id, function(event) {
          var setting = Store.settings[event.data];
          
          if (event.originalEvent.touches.length !== 1) {return;}
          event.timeStamp = new Date().getTime();console.log(event.originalEvent.changedTouches.length);
          setting.touch = true;
  
          setTimeout(function(){
            if (setting.touch && !jQuery.data(event.currentTarget, setting.nss.data)) {
              jQuery.data(event.currentTarget, setting.nss.data, 'preload');
              Store.preload(setting, event);
            }
          }, 500);
        })
        .unbind(setting.nss.touchmove)
        .bind(setting.nss.touchmove, setting.id, function(event) {
          var setting = Store.settings[event.data];
          
          setting.touch = false;
        })*/;
      })
      setting.observe && jQuery(document).trigger(setting.nss.event);
      
      (function(id, wait) {
        setTimeout(function() {
          if (setting = Store.settings[id]) {
            setting.volume -= Number(!!setting.volume);
            setTimeout(arguments.callee, wait);
          }
        }, wait);
      })(setting.id, setting.cooldown);
      
      setting.prefetch &&
      jQuery(setting.prefetch)
      .each(function() {
        Store.prefetch.call(this);
      });
    },
    check: function(setting, event, target, drive) {
      var url, queue, id;
      if (!target) {return;}
      url = Store.getURL(setting, event.currentTarget);
      queue = setting.queue;
      switch (true) {
        case !Store.settings[setting.id]:
        case queue.length > 100:
        case setting.interval ? new Date().getTime() - setting.timeStamp < setting.interval : 0:
        case setting.volume >= setting.limit:
        case setting.target !== target:
        case setting.target.protocol !== target.protocol:
        case setting.target.host !== target.host:
        case jQuery(target).is('[target="_blank"]'):
        case setting.check ? !!Store.fire(setting.check, event.currentTarget, [url]) : Store.loaded[url.replace(/#.*/, '')]:
        case !(function(points) {
                if (points.length < 3) {return false;}
                var speed1, time1, speed2, time2;
                time1 = points[0].timeStamp - points[1].timeStamp;
                speed1 = Math.pow(points[0].pageX - points[1].pageX, 2) + Math.pow(points[0].pageY - points[1].pageY, 2) / (time1 || 1);
                time2 = points[1].timeStamp - points[2].timeStamp;
                speed2 = Math.pow(points[1].pageX - points[2].pageX, 2) + Math.pow(points[1].pageY - points[2].pageY, 2) / (time2 || 1);
                switch (true) {
                  case time1 > 100 || time2 > 100:
                    return false;
                  case speed1 < speed2 + Math.pow(5, 2) && speed1 <= Math.pow(25, 2):
                    return true;
                  default:
                    return false;
                }
              })(setting.points):
          break;
        default:
          while (id = queue.shift()) {clearTimeout(id);}
          id = setTimeout(function() {
            while (id = queue.shift()) {clearTimeout(id);}
            switch (true) {
              case !setting.target:
              case event !== setting.points[0]:
              case event.pageX !== setting.points[0].pageX || event.pageY !== setting.points[0].pageY:
              case !setting.ajax.crossDomain && setting.target.protocol !== window.location.protocol:
              case !setting.ajax.crossDomain && setting.target.host !== window.location.host:
                break;
              default:
                setting.xhr && setting.xhr.readyState < 4 && setting.xhr.abort();
                Store.loaded[url.replace(/#.*/, '')] = true;
                ++setting.volume;
                setting.timeStamp = event.timeStamp;
                
                jQuery.data(target, setting.nss.data, 'preload');
                
                if (setting.lock) {
                  jQuery.data(setting.target, setting.nss.data, 'lock');
                  jQuery(setting.target)
                  .one(setting.nss.click, event.timeStamp, function(event) {
                    if (jQuery.data(event.currentTarget, setting.nss.data)) {
                      // Behavior when using the lock
                      var $context = jQuery(this);
                      var timer = Math.max(setting.lock - new Date().getTime() + event.data, 0);
                      jQuery.data(event.currentTarget, setting.nss.data, 'click');
                      if (timer) {
                        setTimeout(function() {
                          'click' === jQuery.data(event.currentTarget, setting.nss.data) && Store.click(setting, event);
                          jQuery.removeData(event.currentTarget, setting.nss.data);
                        }, timer);
                        event.preventDefault();
                      }
                    }
                  });
                }
                
                Store.preload(setting, event);
            }
          }, 30);
          queue.push(id);
      }
    },
    preload: function(setting, event) {
      var ajax = jQuery.extend(true, {}, setting.ajax, {
        success: function() {
          time = new Date().getTime() - time;
          Store.fire(setting.ajax.success, this, arguments);
          
          Store.loaded[this.url.replace(/#.*/, '')] = true;
          for (var i in Store.req) {
            var xhr = Store.req[i];
            if (xhr && xhr.readyState < 4) {
              xhr.abort();
              Store.req[i] = null;
            }
          }
          if (arguments[2].status === 304 || time <= setting.skip) {
            setting.volume -= Number(!!setting.volume);
            setting.timeStamp = 0;
          }
          if ('click' === jQuery.data(event.currentTarget, setting.nss.data)) {
            Store.click(setting, event);
          } else {
            var ajax, prefetch;
            if (setting.prefetch) {
              ajax = {
                async: true,
                dataType: 'text',
                success: function() {
                  Store.loaded[this.url] = true;
                  Store.req[url] = null;
                }
              };
              prefetch = jQuery(arguments[0]);
              prefetch.filter(setting.prefetch).add(prefetch.find(setting.prefetch))
              .each(function() {
                Store.prefetch.call(this, setting, ajax);
              });
            }
          }
          jQuery.removeData(event.currentTarget, setting.nss.data);
        },
        error: function() {
          Store.fire(setting.ajax.error, this, arguments);
          
          setting.volume -= Number(!!setting.volume);
          setting.timeStamp = 0;
          jQuery.removeData(event.currentTarget, setting.nss.data);
        }
      });
      var query = setting.query;
      if (query) {
        query = query.split('=');
        query = encodeURIComponent(query[0]) + (query.length > 0 ? '=' + encodeURIComponent(query[1]) : '');
      }
      var url = Store.getURL(setting, event.currentTarget);
      ajax.url = url.replace(/([^#]+)(#[^\s]*)?$/, '$1' + (query ? (url.match(/\?/) ? '&' : '?') + query : '') + '$2');
      var time = new Date().getTime();
      setting.xhr = jQuery.ajax(ajax);
    },
    click: function(setting, event) {
      var target = event.currentTarget;
      setting.xhr && setting.xhr.readyState < 4 && setting.xhr.abort();
      jQuery(event.currentTarget).removeData(setting.nss.data);
      if (jQuery(document).find(event.currentTarget)[0]) {
        jQuery(document)
        .unbind(setting.nss.click)
        .one(setting.nss.click, function(event) {
          if (!event.isDefaultPrevented()) {
            window.location.href = setting.encode ? Store.canonicalizeURL(target.href) : target.href;
            if (setting.encode) {'href' in this ? window.location.href = Store.getURL(setting, this) : window.location.href = Store.getURL(setting, this);}
          }
        });
        jQuery(event.currentTarget).click();
      }
      event.preventDefault();
    },
    prefetch: function(setting, ajax) {
      var url = Store.getURL(setting, this);
      
      if (!ajax) {
        Store.loaded[url] = true;
      } else if (url && !Store.loaded[url]) {
        ajax.url = url;
        Store.req[url] = jQuery.ajax(ajax);
      }
    },
    getURL: function(setting, element) {
      var url;
      switch (element.tagName.toLowerCase()) {
        case 'a':
        case 'link':
          url = element.href;
          break;
        case 'script':
        case 'img':
        case 'iframe':
          url = element.src;
          break;
      }
      return setting.encode ? Store.canonicalizeURL(url) : url;
    },
    canonicalizeURL: function(url) {
      var ret;
      // Trim
      ret = Store.trim(url);
      // Remove string starting with an invalid character
      ret = ret.replace(/["`^|\\<>{}\[\]\s].*/, '');
      // Deny value beginning with the string of HTTP(S) other than
      ret = /^https?:/i.test(ret) ? ret : jQuery('<a/>', {href: ret})[0].href;
      // Unify to UTF-8 encoded values
      ret = encodeURI(decodeURI(ret));
      // Fix case
      ret = ret.replace(/(?:%\w{2})+/g, function(str) {
        return url.match(str.toLowerCase()) || str;
      });
      return ret;
    },
    trim: function(text) {
      if (String.prototype.trim) {
        text = String(text).trim();
      } else {
        if (text = String(text).replace(/^[\s\uFEFF\xA0]+/, '')) {
          for (var i = text.length; --i;) {
            if (/[^\s\uFEFF\xA0]/.test(text.charAt(i))) {
              text = text.substring(0, i + 1);
              break;
            }
          }
        }
      }
      return text;
    },
    fire: function(fn, context, args, async) {
      if (typeof fn === 'function') {return async ? setTimeout(function() {fn.apply(context, args)}, 0) : fn.apply(context, args);} else {return fn;}
    }
  };
  
  registrate.apply(this, [].slice.call(arguments).concat([Store]));
}) (jQuery, window, document, void 0);
