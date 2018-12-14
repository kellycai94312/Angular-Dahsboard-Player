import {Input} from '@angular/core';

export class ItemComponent<T> {

  @Input()
  public data: T;

}
