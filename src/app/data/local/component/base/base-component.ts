import {Input} from '@angular/core';

export class BaseComponent<T> {

  @Input()
  public data: T;

  public update(data: T): void {
    this.data = Object.assign(this.data, data);
  }

}
