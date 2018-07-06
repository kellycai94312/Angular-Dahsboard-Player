import {IdentifiedObject} from '../../../base/identified-object';
import {FileClass} from './file-class';
import {FileType} from './file-type';
import {Resource} from '../resource';

export class BaseFile extends IdentifiedObject {
  public discriminator: FileType;
  public clazz: FileClass;
  public objectId: number;
  public orderId: number;
  public resource: Resource;
}
