import {FileClass} from './file-class';
import {FileType} from './file-type';
import {Resource} from '../resource';
import {VersionObject} from '../../../base/version/version-object';

export class BaseFile extends VersionObject {
  public discriminator: FileType;
  public clazz: FileClass;
  public objectId: number;
  public orderId?: number;
  public resource?: Resource;
}
