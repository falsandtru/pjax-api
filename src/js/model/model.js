
/* MODEL */

M = {
  // ネームスペース（プロパティネーム）
  NAME: NAME,

  NAMES: {
    CHANGE: NAME + '.change'
  },

  // MODELの遷移状態
  state: -1,

  // 共有データ保存用オブジェクト
  store: {},

  // 共有/個別データ管理
  stock: function stock(key, value){
    if (this.constructor === stock) {
      // 個別データを設定
      this.uid = M.UID();
      stock[this.uid] = this;
      if (arguments.length) {
        stock[key] = this;
      }
      return;
    }

    var ret;
    switch (arguments.length) {
      case 0:
        // 個別データ保存用オブジェクトを返す
        ret= new stock();
        break;
      case 1:
        // 共有データを取得
        ret = M.store[key];
        break;
      case 2:
        // 共有データを設定
        ret = M.store[key] = value;
        break;
    }
    return ret;
  },

  init: function() {
    M.state = 0;
  },

  main: function($context, param) {
    var stock = new M.stock();

    // パラメータのパターン別処理
    var pattern;
    pattern = $context instanceof NAMESPACE ? 'm:' : 'f:';
    pattern += param ? ({}).toString.call(param).split(' ').pop() : param;
    switch (pattern.toLowerCase()) {
      case 'f:number':
      case 'f:0':
      case 'f:string':
      case 'f:':
      case 'm:object':
      case 'm:null':
      case 'm:function':
      case 'm:undefined':
    }

    // setting
    var initial = {
        },
        setting = $.extend(true, {}, param),
        fix = {
          uid: stock.uid,
          context: $context,
          defaults: [initial],
          params: [].slice.call(arguments, 1)
        },
        compute = function() {
          return {
            computed: true
          };
        };

    setting = $.extend(true, {}, initial, setting, fix);
    setting = $.extend(true, {}, setting, compute());

    V.BIND('html');

    // インスタンスを使用して実行別にデータを保存する
    stock.context = $context;
    stock.arguments = arguments;
    stock.setting = setting;

    return $context;
  },

  SEND: function() {
    setTimeout(function(){M.UPDATE(M.stock('res')||0);}, 100);
  },

  UPDATE: function(res) {
    M.stock('res', ++res);
    V.$DRIVER.trigger(M.NAMES.CHANGE);
  },

  RECEIVE: function() {
    return M.stock('res');
  }

  /*
  // FactoryMethodパターン
  // サブクラスを作成して利用する機能のフォーマット
  Factory: function() {
    this.uid = M.UID();
    M.OBJECTS[this.uid] = this;

  },

  // Commandパターン
  // 複雑な処理を代行させる機能のフォーマット
  Command: function() {
    this.uid = M.UID();
    M.OBJECTS[this.uid] = this;

  }
  */
};
