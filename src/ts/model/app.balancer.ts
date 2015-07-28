/// <reference path="../define.ts"/>
/// <reference path="app.data.ts"/>
/// <reference path="../library/utility.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  export class Balancer implements BalancerInterface {

    constructor(private data_: DataInterface) { }
    
    private util_ = LIBRARY.Utility

    private force_: boolean = false

    private _host: string = ''
    private host_(): string
    private host_(host: string, setting: SettingInterface): string
    private host_(host?: string, setting?: SettingInterface): string {
      if (setting) {
        this._host = setting.balance.active ? this.sanitize(host, setting).split('//').pop().split('/').shift() || '' : '';
      }
      return this._host;
    }
    host(): string {
      return this.host_();
    }

    sanitize(host: string, setting: SettingInterface): string
    sanitize($xhr: JQueryXHR, setting: SettingInterface): string
    sanitize(param: any, setting: SettingInterface): any {
      if (!setting) { return ''; }
      var host: string;
      switch (param && typeof param) {
        case 'string':
          host = param;
          break;
        case 'object':
          var $xhr: JQueryXHR = param;
          host = $xhr.readyState === 4 && $xhr.getResponseHeader(setting.balance.server.header) || $xhr.host;
          break
      }
      host = host || '';
      return !/[/?#"`^|\\<>{}\[\]\s]/.test(host)
          && jQuery.grep(setting.balance.bounds, bound => '' === host || '*' === bound || host === bound || '.' === bound.charAt(0) && bound === host.slice(-bound.length)).length
          && host
          || '';
    }

    enable(setting: SettingInterface): void {
      if (!setting.balance.active) {
        return void this.disable(setting);
      }
      if (setting.balance.client.support.browser.test(window.navigator.userAgent)) {
        this.data_.setCookie(setting.balance.client.cookie.balance, '1');
      } else{
        return void this.disable(setting);
      }
      if (setting.balance.client.support.redirect.test(window.navigator.userAgent)) {
        this.data_.setCookie(setting.balance.client.cookie.redirect, '1');
      }
    }

    disable(setting: SettingInterface): void {
      if (this.data_.getCookie(setting.balance.client.cookie.balance)) {
        this.data_.setCookie(setting.balance.client.cookie.balance, '0');
      }
      if (this.data_.getCookie(setting.balance.client.cookie.redirect)) {
        this.data_.setCookie(setting.balance.client.cookie.redirect, '0');
      }
      this.changeServer('', setting);
    }

    score(time: number, size: number): number {
      return Math.max(Math.round(size / time * 1000), 0);
    }

    changeServer(host: string, setting: SettingInterface): string {
      if (!setting.balance.active) {
        this.host_('', setting);
      } else {
        this.host_(host, setting);
        this.data_.setCookie(setting.balance.client.cookie.host, host);
      }
      return this.host();
    }

    private chooseServers_(setting: SettingInterface): string[] {
      var respite = setting.balance.server.respite,
          weight = setting.balance.weight,
          timeout = setting.ajax.timeout,
          hosts = setting.balance.client.hosts.slice();

      hosts = this.force_ ? jQuery.grep(hosts, (host) => !!host) : hosts;
      (() => {
        var host: string = this.data_.getCookie(setting.balance.client.cookie.host); 
        if (this.force_ && !host) { return; }
        if (host === this.sanitize(host, setting)) {
          !~jQuery.inArray(host, hosts) && hosts.unshift(host);
        } else {
          this.data_.setCookie(setting.balance.client.cookie.host, '');
        }
      })();

      var servers = this.data_.getServerBuffers(),
          scoreTable: { [score: string]: ServerStoreSchema } = {};
      jQuery.each(Object.keys(servers), (i, index) => {
        var server: ServerStoreSchema = servers[index];
        ~jQuery.inArray(server.host, hosts) && hosts.splice(jQuery.inArray(server.host, hosts), 1);

        if (this.force_ && !server.host) { return; }
        if (server.host === this.sanitize(server.host, setting) && server.expires > new Date().getTime()) {
          scoreTable[server.score] = server;
        } else {
          this.data_.removeServer(server.host);
        }
      });

      var scores = Object.keys(scoreTable).sort(sortScoreDes);
      function sortScoreDes(a, b) {
        return +b - +a;
      }

      var result: string[] = [],
          primary: ServerStoreSchema;
      jQuery.each(scores, (i) => {
        var server = scoreTable[scores[i]],
            host = server.host,
            time = server.time,
            score = server.score,
            state = server.state;

        ~jQuery.inArray(host, hosts) && hosts.splice(jQuery.inArray(host, hosts), 1);

        if (state + respite >= new Date().getTime()) {
          return;
        } else if (state) {
          this.data_.removeServer(server.host);
        }

        switch (true) {
          case result.length >= setting.balance.random && 0 < result.length:
            return false;
          case weight && !host && !!Math.floor(Math.random() * weight):
          case timeout && time >= timeout:
          case result.length >= Math.min(Math.floor(scores.length / 2), 3) && primary && time >= primary.time + 500 && timeout && time >= timeout * 2 / 3 :
          case result.length >= Math.min(Math.floor(scores.length / 2), 3) && primary && score <= primary.score / 2:
            return;
        }
        primary = primary || server;
        result.push(host);
      });

      while (hosts.length) {
        result.push(hosts.splice(Math.floor(Math.random() * hosts.length), 1).shift());
      }

      return result;
    }

    private chooseServerFromCache_(setting: SettingInterface): string {
      var hosts: string[] = [];
      var history: HistoryStoreSchema = this.data_.getHistoryBuffer(setting.destLocation.href);
      switch (true) {
        case !history:
          break;
        case history.host !== this.sanitize(history.host, setting):
          this.data_.saveExpires(history.url, '', 0);
        case !history.expires:
        case history.expires < new Date().getTime():
        case this.force_ && !history.host:
          break;
        default:
          hosts = jQuery.map(this.data_.getServerBuffers(), (server: ServerStoreSchema) => {
            if (server.host !== history.host) { return; }
            if (server.state >= new Date().getTime()) {
              this.data_.saveExpires(history.url, history.host, 0);
              return;
            }
            return server.host;
          });
      }
      return hosts.length ? hosts.pop() || ' ' : '';
    }

    private chooseServerFromScore_(setting: SettingInterface): string {
      var hosts = this.chooseServers_(setting);
      return hosts.slice(Math.floor(Math.random() * Math.min(hosts.length, 6))).shift() || ' ';
    }

    chooseServer(setting: SettingInterface): string {
      if (!setting.balance.active) { return ''; }
      // 正規サーバーを空文字でなくスペースで返させることで短絡評価を行いトリムで空文字に戻す
      return this.util_.trim(this.chooseServerFromCache_(setting) || this.chooseServerFromScore_(setting));
    }

    private parallel_ = 4
    bypass(setting: SettingInterface): JQueryDeferred<any> {
      this.force_ = true;

      var deferred = jQuery.Deferred();
      if (!setting || !setting.balance.active) { return deferred.reject(); }

      var parallel = this.parallel_,
          hosts = this.chooseServers_(setting),
          option: JQueryAjaxSettings = jQuery.extend({}, setting.ajax, setting.balance.option.ajax);

      hosts = jQuery.grep(hosts, (host) => !!host);

      var index: number = 0,
          length: number = hosts.length;

      var test = (host: string) => {
        var that = this,
            time = new Date().getTime();

        'pending' === deferred.state() &&
        jQuery.ajax(jQuery.extend({}, option, <JQueryAjaxSettings>{
          url: that.util_.normalizeUrl(window.location.protocol + '//' + host + window.location.pathname.replace(/^\/?/, '/') + window.location.search),
          xhr: !setting.balance.option.callbacks.ajax.xhr ? undefined : function () {
            var $xhr: JQueryXHR;
            $xhr = that.util_.fire(setting.balance.option.callbacks.ajax.xhr, this, [event, setting]);
            $xhr = 'object' === typeof $xhr ? $xhr : jQuery.ajaxSettings.xhr();
            return $xhr;
          },
          beforeSend: !setting.balance.option.callbacks.ajax.beforeSend && !setting.server.header ? undefined : function ($xhr: JQueryXHR, ajaxSetting: JQueryAjaxSettings) {
            if (setting.server.header) {
              $xhr.setRequestHeader(setting.nss.requestHeader, 'true');
            }
            if ('object' === typeof setting.server.header) {
              $xhr.setRequestHeader(setting.nss.requestHeader, 'true');
              setting.server.header.area && $xhr.setRequestHeader(setting.nss.requestHeader + '-Area', this.app_.chooseArea(setting.area, document, document));
              setting.server.header.head && $xhr.setRequestHeader(setting.nss.requestHeader + '-Head', setting.load.head);
              setting.server.header.css && $xhr.setRequestHeader(setting.nss.requestHeader + '-CSS', setting.load.css.toString());
              setting.server.header.script && $xhr.setRequestHeader(setting.nss.requestHeader + '-Script', setting.load.script.toString());
            }

            that.util_.fire(setting.balance.option.callbacks.ajax.beforeSend, this, [event, setting, $xhr, ajaxSetting]);
          },
          dataFilter: !setting.balance.option.callbacks.ajax.dataFilter ? undefined : function (data: string, type: Object) {
            return that.util_.fire(setting.balance.option.callbacks.ajax.dataFilter, this, [event, setting, data, type]) || data;
          },
          success: function (data, textStatus, $xhr) {
            time = new Date().getTime() - time;
            var server = that.data_.getServerBuffer(this.url),
                score = that.score(time, $xhr.responseText.length);
            time = server && !server.state && server.time ? Math.round((server.time + time) / 2) : time;
            score = server && !server.state && server.score ? Math.round((server.score + score) / 2) : score;
            that.data_.saveServer(host, new Date().getTime() + setting.balance.server.expires, time, score, 0);

            host = that.sanitize($xhr, setting) || host;
            that.util_.fire(setting.balance.option.ajax.success, this, arguments);
          },
          error: function ($xhr) {
            that.data_.saveServer(host, new Date().getTime() + setting.balance.server.expires, 0, 0, new Date().getTime());

            host = null;
            that.util_.fire(setting.balance.option.ajax.error, this, arguments);
          },
          complete: function () {
            that.util_.fire(setting.balance.option.ajax.complete, this, arguments);

            ++index;
            deferred.notify(index, length, host);

            if (host) {
              that.host_(host, setting);
              hosts.splice(0, hosts.length);
              deferred.resolve(host);
            } else if (!that.host() && hosts.length) {
              test(hosts.shift());
            } else {
              deferred.reject();
            }
          }
        }));
      };

      while (parallel-- && hosts.length) {
        test(hosts.shift());
      }
      return deferred;
    }

  }

}
