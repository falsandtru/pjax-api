/// <reference path="../define.ts"/>
/// <reference path="app.data.ts"/>

/* MODEL */

module MODULE.MODEL.APP {
  
  export class Balance implements BalanceInterface {

    constructor(private model_: ModelInterface, private app_: AppLayerInterface) { }

    private host_: string = ''
    host = () => this.host_

    check(setting: SettingInterface): boolean {
      return setting.balance.self && !!Number(this.app_.data.getCookie(setting.balance.client.cookie.balance));
    }

    enable(setting: SettingInterface): void {
      if (!setting.balance.client.support.userAgent.test(window.navigator.userAgent) || setting.balance.client.exclude.test(window.navigator.userAgent)) {
        return void this.disable(setting);
      }

      if (Number(!this.app_.data.setCookie(setting.balance.client.cookie.balance, '1'))) {
        return void this.disable(setting);
      }
      if (setting.balance.client.support.redirect.test(window.navigator.userAgent)) {
        this.app_.data.setCookie(setting.balance.client.cookie.redirect, '1');
      }
    }

    disable(setting: SettingInterface): void {
      this.app_.data.setCookie(setting.balance.client.cookie.balance, '0');
      this.app_.data.setCookie(setting.balance.client.cookie.redirect, '0');
      this.changeServer(null, setting);
    }

    changeServer(host: string, setting: SettingInterface = this.model_.getGlobalSetting()): void {
      if (!this.check(setting)) { return; }

      host = host || '';

      this.host_ = host;
      this.app_.data.setCookie(setting.balance.client.cookie.host, host);
    }

    chooseServer(setting: SettingInterface): void {
      if (!this.check(setting)) { return; }

      // キャッシュの有効期限内の再リクエストは同じサーバーを選択してキャッシュを使用させる
      var expires: number;
      var historyBufferData: HistorySchema = this.app_.data.getBuffer<HistorySchema>(this.app_.data.storeNames.history, this.model_.convertUrlToKeyUrl(setting.destLocation.href));

      expires = historyBufferData && historyBufferData.expires;
      if (expires && expires >= new Date().getTime()) {
        this.changeServer(historyBufferData.host, setting);
        return;
      }

      // ログから最適なサーバーを選択する
      var logBuffer = this.app_.data.getBuffer<{ [index: number]: LogSchema }>(this.app_.data.storeNames.log),
          timeList: number[] = [],
          logTable: { [index: number]: LogSchema } = {},
          now: number = new Date().getTime();

      if (!logBuffer) {
        host = this.app_.data.getCookie(setting.balance.client.cookie.host);
        if (host) {
          this.enable(setting);
          this.changeServer(host);
        } else {
          this.disable(setting);
        }
        return;
      }
      var time: number;
      for (var i in logBuffer) {
        if (now > logBuffer[i].date + setting.balance.log.expires) { continue; }
        timeList.push(logBuffer[i].performance);
        logTable[logBuffer[i].performance] = logBuffer[i];
      }


      function compareNumbers(a, b) {
        return a - b;
      }
      timeList = timeList.sort(compareNumbers).slice(0, 15);
      var serverBuffer = this.app_.data.getBuffer<{ [index: string]: ServerSchema }>(this.app_.data.storeNames.server);

      if (!serverBuffer) {
        this.disable(setting);
        return;
      }
      var host: string = '',
          time: number;
      while (timeList.length) {
        r = Math.floor(Math.random() * timeList.length);
        time = timeList[r];
        timeList.splice(r, 1);

        host = logTable[time].host.split('//').pop() || '';
        if (!serverBuffer[host] || serverBuffer[host].state && new Date().getTime() < serverBuffer[host].state + setting.balance.server.error) {
          continue;
        }
        if (!host && setting.balance.weight && !(Math.floor(Math.random()) * setting.balance.weight)) {
          continue;
        }
        this.changeServer(host, setting);
        return;
      }

      // サーバーリストからランダムにサーバーを選択する
      var hosts = Object.keys(serverBuffer),
          host: string,
          r: number;
      while (hosts.length) {
        r = Math.floor(Math.random() * hosts.length);
        host = hosts[r];
        hosts.splice(r, 1);

        if (serverBuffer[host].state && new Date().getTime() < serverBuffer[host].state + setting.balance.server.error) {
          continue;
        }
        this.changeServer(host, setting);
        return;
      }

      this.disable(setting);
    }
    
  }

}
