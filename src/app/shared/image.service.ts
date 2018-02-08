import {Injectable} from '@angular/core';
import {ImageClass} from '../data/remote/misc/image-class';
import {RestUrl} from '../data/remote/rest-api/participant-rest-api.service';
import {ImageType} from '../data/remote/model/image-type';

@Injectable()
export class ImageService {

  constructor() {
  }

  public getLogo(clazz: ImageClass, id: number): string {
    return `${RestUrl}/image/download`
      + `?clazz=${ImageClass[clazz]}`
      + `&id=${id}`
      + `&type=${ImageType[ImageType.LOGO]}`
      + `&date=${new Date().getTime()}`;
  }

}
