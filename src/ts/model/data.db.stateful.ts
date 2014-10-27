/// <reference path="../define.ts"/>
/// <reference path="data.db.ts"/>

/* MODEL */

module MODULE.MODEL.APP.DATA {

  export class DBStatefulDefault implements DBStatefulInterface {

    constructor() {
    }

    task(proc: () => void): void {
      this.reserveTask(proc);
    }

    reserveTask(task: () => void): void {
    }

    digestTask(): void {
    }

  }

  export class DBStatefulUp extends DBStatefulDefault implements DBStatefulInterface {

    constructor(private extend_: () => void, private tasks_: { (): void }[]) {
      super();
    }

    reserveTask(task: () => void): void {
      this.extend_();

      'function' === typeof task && this.tasks_.push(task);
    }

    digestTask(): void {
      this.extend_();

      var task: () => void;
      while (task = this.tasks_.pop()) {
        task();
      }
    }

  }

  export class DBStatefulDown extends DBStatefulDefault implements DBStatefulInterface {
  }

}
