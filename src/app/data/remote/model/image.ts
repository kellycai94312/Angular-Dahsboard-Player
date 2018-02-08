import {IdentifiedObject} from '../base/identified-object';
import {ImageClass} from '../misc/image-class';
import {ImageType} from './image-type';

export class Image extends IdentifiedObject {
  clazz: ImageClass;
  objectId: number;
  fileName: string;
  orderId: number;
  iconPath: string;
  fullPath: string;
  iconSize: number;
  fullSize: number;
  mimeType: string;
  type: ImageType;
}
