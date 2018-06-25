import {IdentifiedObject} from '../remote/base/identified-object';

export class HashSet<T extends IdentifiedObject> {
  private _data: T[];

  constructor() {
    this._data = [];
  }

  public size(): number {
    return this._data.length;
  }

  public add(item: T): void {
    for (let i = 0; i < this._data.length; i++) {
      if (item == this._data[i]) return;
      if (this._data[i].id === item.id) return;
    }
    this._data.push(item);
  }

  public addAll(items: T[]): void {
    for (let i = 0; i < items.length; i++) {
      this.add(items[i]);
    }
  }

  public removeAll(): void {
    this._data.splice(0, this._data.length);
  }

  public remove(item: T): void {
    const index = this._data.indexOf(item);
    if (index >= 0) {
      this._data.splice(index, 1);
    }
  }

  public contains(item: T): boolean {
    for (let i = 0; i < this._data.length; i++) {
      if (this._data[i].id === item.id) {
        return true;
      }
    }
    return false;
  }

  get data(): T[] {
    return this._data;
  }

  set data(value: T[]) {
    this._data = value;
  }

}
