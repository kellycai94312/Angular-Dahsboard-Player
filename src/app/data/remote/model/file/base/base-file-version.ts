import {VersionObject} from '../../../base/version/version-object';
import {FileType} from './file-type';
import {Resource} from '../resource';

export class BaseFileVersion extends VersionObject {
  discriminator: FileType;
  resource: Resource;
  orderId?: number;
}
