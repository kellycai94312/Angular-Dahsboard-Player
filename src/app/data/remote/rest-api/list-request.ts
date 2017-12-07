import { IdentifiedObject } from '../base/identified-object';

export class ListRequest<T extends IdentifiedObject> {
  list: T[];

  constructor(list: T[]) {
    this.list = list;
  }

}
