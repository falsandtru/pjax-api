/// <reference path="../define.ts"/>
/// <reference path="app.data.ts"/>
/// <reference path="../library/utility.ts"/>

/* MODEL */

interface Navigator {
  serviceWorker
}

module MODULE.MODEL.APP {

  export class Proxy implements ProxyInterface {

    constructor(private model_: ModelInterface, private app_: AppLayerInterface) {
    }
    
    private util_ = LIBRARY.Utility

    install(setting: SettingInterface): void {
      if ('https:' !== window.location.protocol || !setting.balance.active || !setting.balance.client.proxy.worker) { return; }
      window.navigator.serviceWorker &&
      window.navigator.serviceWorker.register(setting.balance.client.proxy.worker, {
        scope: setting.balance.client.proxy.worker.replace(/[^/]+$/, '')
      });
    }

  }

}
