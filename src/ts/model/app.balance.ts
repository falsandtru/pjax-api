/// <reference path="../define.ts"/>
/// <reference path="app.data.ts"/>
/// <reference path="../library/utility.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  export class Balance implements BalanceInterface {

    constructor(private model_: ModelInterface, private app_: AppLayerInterface) { }
    
    private util_ = LIBRARY.Utility

    private host_: string = ''
    host = () => this.host_

    private isBalanceable_(setting: SettingInterface): boolean {
      return setting.balance.self && !!Number(this.app_.data.getCookie(setting.balance.client.cookie.balance));
    }

    enable(setting: SettingInterface): void {
      if (!this.isBalanceable_(setting)) {
        return void this.disable(setting);
      }
      if (!setting.balance.client.support.userAgent.test(window.navigator.userAgent) || setting.balance.client.exclude.test(window.navigator.userAgent)) {
        return void this.disable(setting);
      }

      if (!this.app_.data.setCookie(setting.balance.client.cookie.balance, '1')) {
        return void this.disable(setting);
      }
      if (setting.balance.client.support.redirect.test(window.navigator.userAgent)) {
        this.app_.data.setCookie(setting.balance.client.cookie.redirect, '1');
      }
    }

    disable(setting: SettingInterface): void {
      this.app_.data.getCookie(setting.balance.client.cookie.balance) &&
      this.app_.data.setCookie(setting.balance.client.cookie.balance, '0');
      this.app_.data.getCookie(setting.balance.client.cookie.redirect) &&
      this.app_.data.setCookie(setting.balance.client.cookie.redirect, '0');
      this.changeServer(null, setting);
    }

    changeServer(host: string, setting: SettingInterface = this.model_.configure(window.location)): void {
      if (!setting || !this.isBalanceable_(setting)) { return; }

      host = host || '';

      this.host_ = host;
      this.app_.data.setCookie(setting.balance.client.cookie.host, host);
    }

    private chooseServers_(expires: number, limit: number, weight: number, respite: number): string[] {
      var servers = this.app_.data.getServerBuffers(),
          serverTableByPerformance: { [performance: string]: ServerStoreSchema } = {},
          result: string[];

      (() => {
        var now: number = new Date().getTime();
        for (var i in servers) {
          if (now > servers[i].date + expires) {
            continue;
          }
          serverTableByPerformance[servers[i].performance] = servers[i];
        }
      })();

      result = [];
      var performanceList = Object.keys(serverTableByPerformance).sort();
      for (var i = 0, performance: string; performance = result.length < limit && performanceList[i]; i++) {
        var server = serverTableByPerformance[performance],
            host = server.host,
            state = server.state;
        if (state && state + respite >= new Date().getTime()) {
          continue;
        }
        if (!host && weight && !(Math.floor(Math.random()) * weight)) {
          continue;
        }
        result.push(host);
      }
      return result;
    }

    chooseServer(setting: SettingInterface): void {
      if (!this.isBalanceable_(setting)) { return; }

      // キャッシュの有効期限内の再リクエストは同じサーバーを選択してキャッシュを使用
      var history: HistoryStoreSchema = this.app_.data.getHistoryBuffer(setting.destLocation.href),
          cacheExpires: number = history && history.expires || 0;

      if (cacheExpires && cacheExpires >= new Date().getTime()) {
        this.changeServer(history.host, setting);
        return;
      }

      // DBにもCookieにもデータがなければ正規サーバを選択
      if (!this.app_.data.getServerBuffers().length && !this.app_.data.getCookie(setting.balance.client.cookie.host)) {
        this.changeServer('', setting);
        return;
      }
      
      // 最適なサーバーを選択
      var servers: string[] = this.chooseServers_(setting.balance.history.expires, 1, setting.balance.weight, setting.balance.server.respite);
      if (servers.length) {
        this.changeServer(servers.shift(), setting);
        return;
      }

      this.disable(setting);
    }

    private parallel_ = 6
    private queue_ = []
    bypass(setting: SettingInterface, retry: number): void {
      if (!this.isBalanceable_(setting)) { return; }
      this.queue_ = this.queue_.length ? this.queue_
                                       : this.chooseServers_(setting.balance.history.expires, setting.balance.history.limit, setting.balance.weight, setting.balance.server.respite).slice(0, retry + 1);
      var servers = this.queue_,
          option: JQueryAjaxSettings = jQuery.extend({}, setting.ajax, setting.balance.option.ajax, setting.balance.option.callbacks.ajax);
      while (servers.length) {
        if (!this.host()) {
          break;
        }
        if (!this.parallel_) {
          servers.length && setTimeout(() => this.bypass(setting, servers.length - 1), option.timeout || 1500);
          return;
        }

        ((server: string) => {
          --this.parallel_;
          var that = this;
          jQuery.ajax(jQuery.extend({}, option, <JQueryAjaxSettings>{
            url: that.util_.normalizeUrl(server + window.location.pathname.replace(/^\/?/, '/') + window.location.search),
            xhr: !setting.balance.option.callbacks.ajax.xhr ? undefined : function () {
              var jqXHR: JQueryXHR;
              jqXHR = that.util_.fire(setting.balance.option.callbacks.ajax.xhr, this, [event, setting]);
              jqXHR = 'object' === typeof jqXHR ? jqXHR : jQuery.ajaxSettings.xhr();
              return jqXHR;
            },
            beforeSend: !setting.balance.option.callbacks.ajax.beforeSend && !setting.server.header ? undefined : function (jqXHR: JQueryXHR, ajaxSetting: JQueryAjaxSettings) {
              if (setting.server.header) {
                jqXHR.setRequestHeader(setting.nss.requestHeader, 'true');
              }
              if ('object' === typeof setting.server.header) {
                jqXHR.setRequestHeader(setting.nss.requestHeader, 'true');
                setting.server.header.area && jqXHR.setRequestHeader(setting.nss.requestHeader + '-Area', this.app_.chooseArea(setting.area, document, document));
                setting.server.header.head && jqXHR.setRequestHeader(setting.nss.requestHeader + '-Head', setting.load.head);
                setting.server.header.css && jqXHR.setRequestHeader(setting.nss.requestHeader + '-CSS', setting.load.css.toString());
                setting.server.header.script && jqXHR.setRequestHeader(setting.nss.requestHeader + '-Script', setting.load.script.toString());
              }

              that.util_.fire(setting.balance.option.callbacks.ajax.beforeSend, this, [event, setting, jqXHR, ajaxSetting]);
            },
            dataFilter: !setting.balance.option.callbacks.ajax.dataFilter ? undefined : function (data: string, type: Object) {
              return that.util_.fire(setting.balance.option.callbacks.ajax.dataFilter, this, [event, setting, data, type]) || data;
            },
            success: function () {
              that.host_ = server;
              that.queue_ = [];

              that.util_.fire(setting.balance.option.ajax.success, this, arguments);
            },
            error: function () {
              that.util_.fire(setting.balance.option.ajax.error, this, arguments);
            },
            complete: function () {
              ++that.parallel_;
              servers.length && that.bypass(setting, servers.length - 1);

              that.util_.fire(setting.balance.option.ajax.complete, this, arguments);
            }
          }));
        })(servers.shift());
      }
    }

  }

}
