import { IdentifiedObject } from '../remote/base/identified-object';

export class HashSet<T extends IdentifiedObject> {

  public data: T[];

  constructor() {
    this.data = [];
  }

  public size(): number {
    return this.data.length;
  }

  public add(item: T): void {
    for (let i = 0; i < this.data.length; i++) {
      if (item == this.data[i]) return;
      if (this.data[i].id === item.id) return;
    }
    this.data.push(item);
  }

  public addAll(items: T[]): void {
    for (let i = 0; i < items.length; i++) {
      this.add(items[i]);
    }
  }

  public removeAll(): void {
    this.data.splice(0, this.data.length);
  }

  public remove(item: T): void {
    const index = this.data.indexOf(item);
    if (index >= 0) {
      this.data.splice(index, 1);
    }
  }

  public contains(item: T): boolean {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === item.id) {
        return true;
      }
    }
    return false;
  }

}
