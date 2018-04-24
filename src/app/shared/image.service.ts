import {Injectable} from '@angular/core';
import {ImageClass} from '../data/remote/misc/image-class';
import {ImageType} from '../data/remote/model/image-type';
import {PropertyConstant} from '../data/local/property-constant';

@Injectable()
export class ImageService {

  constructor() {
  }

  public getLogo(clazz: ImageClass, id: number): string {
    return `${PropertyConstant.restUrl}/image/download`
      + `?clazz=${ImageClass[clazz]}`
      + `&id=${id}`
      + `&type=${ImageType[ImageType.LOGO]}`
      + `&date=${new Date().getTime()}`;
  }

}
