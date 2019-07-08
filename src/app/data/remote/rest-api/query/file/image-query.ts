import {PageQuery} from '../../page-query';
import {FileClass} from '../../../model/file/base/file-class';
import {ImageType} from '../../../model/file/image/image-type';

export class ImageQuery extends PageQuery {
  public clazz: FileClass;
  public objectId: number;
  public type?: ImageType;
  public width?: number;
  public height?: number;
  public cropped?: boolean;
}
