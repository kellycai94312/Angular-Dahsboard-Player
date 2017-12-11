import { Injectable } from '@angular/core';
import { PictureType } from '../data/remote/misc/picture-type';
import { PictureClass } from '../data/remote/misc/picture-class';
import { RestUrl } from '../data/remote/rest-api/participant-rest-api.service';

@Injectable()
export class PictureService {

  constructor() {
  }

  public getLogo(clazz: PictureClass, id: number): string {
    return `${RestUrl}/picture/download`
      + `?clazz=${PictureClass[clazz]}`
      + `&id=${id}`
      + `&type=${PictureType[PictureType.LOGO]}`
      + `&date=${new Date().getTime()}`;
  }

}
