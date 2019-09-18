import { Type } from 'class-transformer';
import { FileType, ResourceFile } from '../base';
import { ImageType } from './image-type';

export class Image extends ResourceFile {

  public type: ImageType;

  @Type(() => Image)
  public croppedImage?: Image;

  public x1?: number;
  public y1?: number;
  public x2?: number;
  public y2?: number;

  constructor() {
    super();
    this.discriminator = FileType.IMAGE;
  }

}
