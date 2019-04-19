import {IIdObject} from './iid-object';
import {DataObject} from './data-object';

export class Node extends DataObject implements IIdObject {

  public id: string;

  constructor(id: string,
              data: any,
              public label?: string) {
    super(data);
    this.id = id;
  }

}
