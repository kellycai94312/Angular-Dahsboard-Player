import { IdentifiedObject } from '../base/identified-object';
import { PictureType } from '../misc/picture-type';
import { PictureClass } from '../misc/picture-class';

export class Picture extends IdentifiedObject {
  clazz: PictureClass;
  objectId: number;
  fileName: string;
  orderId: number;
  iconPath: string;
  fullPath: string;
  iconSize: number;
  fullSize: number;
  mimeType: string;
  type: PictureType;
}
