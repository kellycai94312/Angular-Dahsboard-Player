import { ImageType } from '../../../../model/file/image';

export class ImageQuery {
  public type: ImageType;
  public width?: number;
  public height?: number;
  public cropped?: boolean;
}
