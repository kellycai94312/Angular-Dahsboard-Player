import {BaseFile} from '../base/base-file';
import {ImageType} from './image-type';
import {FileType} from '../base/file-type';

export class Image extends BaseFile {

  public type: ImageType;

  constructor() {
    super();
    this.discriminator = FileType.IMAGE;
  }

}
