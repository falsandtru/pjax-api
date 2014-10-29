/// <reference path="../define.ts"/>
/// <reference path="../library/task.ts"/>
/// <reference path="data.db.stateful.task.ts"/>

/* MODEL */

module MODULE.MODEL.APP.DATA.DB {

  export class Stateful implements DatabaseStatefulInterface {

    constructor(private origin_: DatabaseInterface, private connect_: () => void, private extend_: () => void) {
    }

    private state_ = (): State => this.origin_.state()
    private stateful_(): DatabaseStatefulInterface {
      var select = (statefulClass: DatabaseStatefulClassInterface, taskable: boolean): DatabaseStatefulInterface => {
        return this.cache_.stateful[this.state_()] = this.cache_.stateful[this.state_()] || new statefulClass(this.origin_, this.connect_, this.extend_, this.task_, taskable);
      };

      switch (this.state_()) {
        case State.blank:
          return select(DB.STATE.Blank, true);

        case State.initiate:
          return select(DB.STATE.Initiate, true);

        case State.open:
          return select(DB.STATE.Open, true);

        case State.close:
          return select(DB.STATE.Close, true);

        case State.terminate:
          return select(DB.STATE.Terminate, true);

        case State.error:
          return select(DB.STATE.Error, false);

        default:
          return select(DB.STATE.Except, false);
      }
    }
    
    private task_: LIBRARY.TaskInterface = new LIBRARY.Task()

    private cache_: {
      stateful: { [State: number]: DatabaseStatefulInterface }
    } = {
      stateful: {}
    }

    open() {
      return this.stateful_().open();
    }

    resolve() {
      return this.stateful_().resolve();
    }

    reject() {
      return this.stateful_().reject();
    }

  }

}

module MODULE.MODEL.APP.DATA.DB.STATE {

  export class Default implements DatabaseStatefulInterface {

    constructor(public origin: DatabaseInterface, public connect: () => void, public extend: () => void, task: LIBRARY.TaskInterface, taskable: boolean) {
      this.task = taskable ? new STATEFUL.TaskUp(task) : new STATEFUL.TaskDown(task);
    }

    task: DatabaseTaskInterface

    open(): DatabaseTaskReserveInterface {
      // 無効
      return this.task;
    }

    resolve(): void {
      // 無効
    }

    reject(): void {
      // 常に処理可能
      this.task.reject();
    }

  }

  export class Blank extends Default {

    open() {
      // 新規接続
      this.connect();
      return this.task;
    }

    resolve() {
      // 接続のコールバックによりタスクを処理
      this.open();
    }

    reject() {
      // 常に処理可能
      this.task.reject();
    }

  }

  export class Initiate extends Default {

    open() {
      // 無効
      return this.task;
    }

    resolve() {
      // 接続のコールバックによりタスクを処理
    }

    reject() {
      // 常に処理可能
      this.task.reject();
    }

  }

  export class Open extends Default {

    open() {
      // 接続の有効期限を延長
      this.extend();
      // 戻り値のオブジェクトを使用したタスクの追加を待ってタスクを処理
      setTimeout(() => this.origin.resolve(), 1);
      return this.task;
    }

    resolve() {
      // 現接続によりタスクを処理
      this.task.resolve();
    }

    reject() {
      // 常に処理可能
      this.task.reject();
    }

  }

  export class Close extends Default {

    open() {
      // 再接続
      this.connect();
      return this.task;
    }

    resolve() {
      // 再接続しコールバックによりタスクを処理
      this.open();
    }

    reject() {
      // 常に処理可能
      this.task.reject();
    }

  }

  export class Terminate extends Default {
    // 既定
  }

  export class Error extends Default {
    // 既定
  }

  export class Except extends Default {
    // 既定
  }

}
