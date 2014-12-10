/// <reference path="../define.ts"/>
/// <reference path="app.data.ts"/>
/// <reference path="../library/utility.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  export class Balance implements BalanceInterface {

    constructor(private model_: ModelInterface, private app_: AppLayerInterface) { }
    
    private util_ = LIBRARY.Utility

    private host_: string = ''
    host(): string
    host(host: string, setting: SettingInterface): string
    host(host?: string, setting?: SettingInterface): string {
      if (setting) {
        this.host_ = this.sanitize(host, setting);
      }
      return this.host_;
    }
    private force_: boolean = false

    sanitize(host: string, setting: SettingInterface): string
    sanitize($xhr: JQueryXHR, setting: SettingInterface): string
    sanitize(param: any, setting: SettingInterface): any {
      var host: string = '';
      switch (param && typeof param) {
        case 'string':
          host = param;
          break;
        case 'object':
          var $xhr: JQueryXHR = param;
          try {
            host = $xhr.getResponseHeader(setting.balance.server.header) || $xhr.host;
          } catch (e) {
            host = $xhr.host;
          }
          break
      }
      host = host || '';
      host = setting.balance.filter(host) && host;
      return host;
    }

    enable(setting: SettingInterface): void {
      if (!setting.balance.active) {
        return void this.disable(setting);
      }
      if (setting.balance.client.support.browser.test(window.navigator.userAgent)) {
        this.app_.data.setCookie(setting.balance.client.cookie.balance, '1');
      } else{
        return void this.disable(setting);
      }
      if (setting.balance.client.support.redirect.test(window.navigator.userAgent)) {
        this.app_.data.setCookie(setting.balance.client.cookie.redirect, '1');
      }
    }

    disable(setting: SettingInterface): void {
      if (this.app_.data.getCookie(setting.balance.client.cookie.balance)) {
        this.app_.data.setCookie(setting.balance.client.cookie.balance, '0');
      }
      if (this.app_.data.getCookie(setting.balance.client.cookie.redirect)) {
        this.app_.data.setCookie(setting.balance.client.cookie.redirect, '0');
      }
      this.changeServer('', setting);
    }

    score(time: number, size: number): number {
      return Math.max(Math.round(size / time * 1000), 0);
    }

    changeServer(host: string, setting: SettingInterface): string {
      if (!setting.balance.active) {
        this.host('', setting);
      } else {
        this.host(host, setting);
        this.app_.data.setCookie(setting.balance.client.cookie.host, host);
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
        var host: string = this.app_.data.getCookie(setting.balance.client.cookie.host); 
        if (this.force_ && !host) { return; }
        if (host === this.sanitize(host, setting)) {
          !~jQuery.inArray(host, hosts) && hosts.unshift(host);
        } else {
          this.app_.data.setCookie(setting.balance.client.cookie.host, '');
        }
      })();

      var servers = this.app_.data.getServerBuffers(),
          scoreTable: { [score: string]: ServerStoreSchema } = {};
      jQuery.each(Object.keys(servers), (i, index) => {
        var server: ServerStoreSchema = servers[index];
        ~jQuery.inArray(server.host, hosts) && hosts.splice(jQuery.inArray(server.host, hosts), 1);

        if (this.force_ && !server.host) { return; }
        if (server.host === this.sanitize(server.host, setting) && server.expires > new Date().getTime()) {
          scoreTable[server.score] = server;
        } else {
          this.app_.data.removeServer(server.host);
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
          this.app_.data.removeServer(server.host);
        }

        switch (true) {
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

    chooseServer(setting: SettingInterface): string {
      if (!setting.balance.active) { return ''; }

      var hosts: string[];

      // キャッシュの有効期限内の再リクエストは同じサーバーを選択してキャッシュを使用
      var history: HistoryStoreSchema = this.app_.data.getHistoryBuffer(setting.destLocation.href);
      switch (false) {
        case history && history.host === this.sanitize(history.host, setting):
          this.app_.data.saveExpires(history.url, '', 0);
        case !!history:
        case !!history.expires && history.expires >= new Date().getTime():
        case !!history.host || !this.force_:
          break;
        default:
          hosts = [history.host || ''];
      }

      // 応答性能の高いサーバーをリストアップ
      hosts = hosts || this.chooseServers_(setting);

      // 上位6サーバーまでからランダムに選択
      return hosts.slice(Math.floor(Math.random() * Math.min(hosts.length, 6))).shift() || '';
    }

    private parallel_ = 4
    bypass(): JQueryDeferred<any> {
      var setting: SettingInterface = this.app_.configure(window.location),
          deferred = jQuery.Deferred();
      if (!setting.balance.active) { return deferred.reject(); }
      var parallel = this.parallel_,
          hosts = this.chooseServers_(setting),
          option: JQueryAjaxSettings = jQuery.extend({}, setting.ajax, setting.balance.option.ajax);

      hosts = jQuery.grep(hosts, (host) => !!host);

      var index: number = 0,
          length: number = hosts.length;

      var test = (host: string) => {
        var that = this,
            loadtime = new Date().getTime();

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
            loadtime = new Date().getTime() - loadtime;
            that.app_.data.saveServer(host, new Date().getTime() + setting.balance.server.expires, loadtime, that.score(loadtime, $xhr.responseText.length), 0);

            host = that.sanitize($xhr, setting) || host;
            that.util_.fire(setting.balance.option.ajax.success, this, arguments);
          },
          error: function ($xhr) {
            that.app_.data.saveServer(host, new Date().getTime() + setting.balance.server.expires, 0, 0, new Date().getTime());

            host = null;
            that.util_.fire(setting.balance.option.ajax.error, this, arguments);
          },
          complete: function () {
            that.util_.fire(setting.balance.option.ajax.complete, this, arguments);

            ++index;
            deferred.notify(index, length, host);

            if (host) {
              that.host(host, setting);
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

      this.force_ = true;
      while (parallel-- && hosts.length) {
        test(hosts.shift());
      }
      return deferred;
    }

  }

}
