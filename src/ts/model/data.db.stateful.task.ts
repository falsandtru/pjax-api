/// <reference path="../define.ts"/>
/// <reference path="../library/task.ts"/>

/* MODEL */

module MODULE.MODEL.APP.DATA.DB.STATEFUL {

  export class Task implements DatabaseTaskReserveInterface, DatabaseTaskDigestInterface {

    constructor(private task_: LIBRARY.TaskInterface) {
    }
    
    private labels_ = {
      done: 'done',
      fail: 'fail',
      always: 'always'
    }

    done(callback: () => void): Task {
      this.task_.reserve(this.labels_.done, callback);
      return this;
    }

    fail(callback: () => void): Task {
      this.task_.reserve(this.labels_.fail, callback);
      return this;
    }

    always(callback: () => void): Task {
      this.task_.reserve(this.labels_.always, callback);
      return this;
    }

    resolve(): Task {
      this.task_.clear(this.labels_.fail);
      this.task_.digest(this.labels_.done);
      this.task_.digest(this.labels_.always);
      return this;
    }

    reject(): Task {
      this.task_.clear(this.labels_.done);
      this.task_.digest(this.labels_.fail);
      this.task_.digest(this.labels_.always);
      return this;
    }

  }

  export class TaskUp extends Task {
  }

  export class TaskDown extends Task {

    done(callback: () => void): Task {
      return this;
    }

    fail(callback: () => void): Task {
      return this;
    }

    always(callback: () => void): Task {
      return this;
    }

    resolve(): Task {
      return this;
    }

    //reject(): Task {
    //  return this;
    //}

  }

}
