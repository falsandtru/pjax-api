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
    private bypass_: boolean = false

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

    changeServer(host: string, setting: SettingInterface = this.model_.configure(window.location)): string {
      if (!setting || !setting.balance.active) {
        this.host_ = '';
      } else {
        this.host_ = host || '';
        this.app_.data.setCookie(setting.balance.client.cookie.host, host);
      }
      return this.host();
    }

    private chooseServers_(setting: SettingInterface): string[] {
      var respite = setting.balance.server.respite,
          weight = setting.balance.weight,
          timeout = setting.ajax.timeout,
          hosts = setting.balance.client.hosts.slice();

      hosts = this.bypass_ ? jQuery.grep(hosts, (host) => !!host) : hosts;
      if (!~jQuery.inArray(this.app_.data.getCookie(setting.balance.client.cookie.host), hosts)) {
        hosts.unshift(this.app_.data.getCookie(setting.balance.client.cookie.host));
      }

      var servers = this.app_.data.getServerBuffers(),
          scoreTable: { [score: string]: ServerStoreSchema } = {};
      jQuery.each(Object.keys(servers), (i, index) => {
        var server: ServerStoreSchema = servers[index];
        if (this.bypass_ && !server.host) { return; }
        scoreTable[server.score] = server;
      });

      var scores = Object.keys(scoreTable).sort(sortScoreDes);
      function sortScoreDes(a, b) {
        return +b - +a;
      }

      var result: string[] = [];
      jQuery.each(scores, (i) => {
        var server = scoreTable[scores[i]],
            host = server.host,
            time = server.time,
            score = server.score,
            state = server.state;

        ~jQuery.inArray(host, hosts) && hosts.splice(jQuery.inArray(host, hosts), 1);

        if (state + respite >= new Date().getTime()) { return; }

        if (state || new Date().getTime() > server.expires) {
          time = timeout - 1;
          this.app_.data.saveServer(server.host, new Date().getTime() + setting.balance.server.expires, time, score, 0);
        }
        switch (true) {
          case result.length === 6:
          case timeout && time >= timeout:
          case timeout && time >= timeout * 2 / 3 && result.length < 3:
          case weight && !host && !!Math.floor(Math.random() * weight):
            return;
        }
        result.push(host);
      });

      while (hosts.length) {
        var host = hosts.splice(Math.floor(Math.random() * hosts.length), 1).shift();
        result.push(host);
      }

      return result;
    }

    chooseServer(setting: SettingInterface): string {
      if (!setting.balance.active) { return ''; }

      var hosts: string[];

      // キャッシュの有効期限内の再リクエストは同じサーバーを選択してキャッシュを使用
      var history: HistoryStoreSchema = this.app_.data.getHistoryBuffer(setting.destLocation.href);
      switch (false) {
        case !!history:
        case history.expires && history.expires >= new Date().getTime():
        case history.host || !this.bypass_:
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
          success: function (data, textStatus, jqXHR) {
            loadtime = new Date().getTime() - loadtime;
            that.app_.data.saveServer(host, new Date().getTime() + setting.balance.server.expires, loadtime, that.score(loadtime, jqXHR.responseText.length), 0);

            host = host;
            that.util_.fire(setting.balance.option.ajax.success, this, arguments);
          },
          error: function (jqXHR) {
            that.app_.data.saveServer(host, new Date().getTime() + setting.balance.server.expires, loadtime, 0, new Date().getTime());

            host = null;
            that.util_.fire(setting.balance.option.ajax.error, this, arguments);
          },
          complete: function () {
            that.util_.fire(setting.balance.option.ajax.complete, this, arguments);

            ++index;
            deferred.notify(index, length, host);

            if (host) {
              that.host_ = host;
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

      this.bypass_ = true;
      while (parallel-- && hosts.length) {
        test(hosts.shift());
      }
      return deferred;
    }

  }

}
