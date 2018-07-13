export class Mutex {

  private _acquired: boolean;
  private _waitingResolvers: Array<() => void>;

  constructor() {
    this._acquired = false;
    this._waitingResolvers = [];
  }

  public acquire(): Promise<void> {
    if (!this._acquired) {
      this._acquired = true;
      return Promise.resolve();
    }

    return new Promise(resolve => {
      this._waitingResolvers.push(resolve);
    });
  }

  public release(): void {
    if (this._waitingResolvers.length) {
      const resolve = this._waitingResolvers.shift();
      resolve();
    } else {
      this._acquired = false;
    }
  }

}
