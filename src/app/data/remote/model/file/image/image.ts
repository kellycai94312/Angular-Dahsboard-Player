import {BaseFile} from '../base/base-file';
import {ImageType} from './image-type';
import {FileType} from '../base/file-type';

export class Image extends BaseFile {

  type: ImageType;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;

  constructor() {
    super();
    this.discriminator = FileType.IMAGE;
  }

}
