import {ImageType} from '../../model/image-type';
import {ImageDimension} from '../../../local/image-dimension';

export class ImageQuery {
  public clazz?: string;
  public id?: number;
  public type?: ImageType;
  public dimension: ImageDimension;
}
