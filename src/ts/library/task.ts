/// <reference path="../define.ts"/>

/* MODEL */

module MODULE.LIBRARY {

  export declare class TaskInterface {
    constructor(mode?: number, size?: number)
    define(name: string, mode: number, size: number): void
    reserve(task: () => void): void
    reserve(name: string, task: () => void): void
    digest(limit?: number): void
    digest(name: string, limit?: number): void
    clear(name?: string): void
  }
  export class Task {

    constructor(mode: number = 1, size: number = 0) {
      this.config_.mode = mode || this.config_.mode;
      this.config_.size = size || this.config_.size;
    }

    list_: any[] = [] // [[(...args: any[]) => void, context: any, args?: any[]], ...]
    config_: { mode: number; size: number; } = {
      mode: 1,
      size: 0
    }

    table_: { [index: string]: any[]; } = {}
    option_: { [index: string]: { mode: number; size: number; }; } = {}

    define(label: string, mode: number = this.config_.mode, size: number = this.config_.size): void {
      this.option_[label] = {
        mode: mode,
        size: size
      };
      this.table_[label] = [];
    }

    reserve(task: (...args: any[]) => void): void
    reserve(label: string, task: (...args: any[]) => void): void
    reserve(label: any, task?: (...args: any[]) => void): void {
      switch (typeof label) {
        case 'string':
          !this.option_[label] && this.define(label);

          var config = this.option_[label],
              list = this.table_[label],
              args = <any[]>[].slice.call(arguments, 2);
          break;

        case 'function':
          task = label;
          label = undefined;
          var config = this.config_,
              list = this.list_,
              args = <any[]>[].slice.call(arguments, 1);
          break;

        default:
          return;
      }

      if ('function' !== typeof task) { return; }

      var method: string;
      if (config.mode > 0) {
        method = 'push';
      } else {
        method = 'unshift';
      }
      list[method]([task, args.shift(), args]);
    }
    
    digest(limit?: number): void
    digest(label: string, limit?: number): void
    digest(label?: any, limit?: number): void {
      switch (typeof label) {
        case 'string':
          !this.option_[label] && this.define(label);

          limit = limit || 0;
          var config = this.option_[label],
              list = this.table_[label];
          if (!list) { return; }
          break;

        case 'number':
        case 'undefined':
          limit = label || 0;
          label = undefined;
          var config = this.config_,
              list = this.list_;
          break;

        default:
          return;
      }

      if (list.length > config.size && config.size) {
        if (config.mode > 0) {
          list.splice(0, list.length - config.size);
        } else {
          list.splice(list.length - config.size, list.length);
        }
      }

      var task: any[];
      limit = limit || -1;
      while (task = limit-- && list.pop()) {
        task.shift().apply(task.shift() || window, task.shift() || []);
      }

      if (undefined === label) {
        var table = this.table_;
        for (var i in table) {
          this.digest(i, limit);
        }
      }
    }
    
    clear(label?: string): void {
      switch (typeof label) {
        case 'string':
          !this.option_[label] && this.define(label);

          this.table_[label].splice(0, this.table_[label].length);
          break;

        default:
          var table = this.table_;
          for (var i in table) {
            this.clear(i);
          }
      }
    }

  }

}
