import {Injectable} from '@angular/core';
import {PropertyConstant} from '../data/local/property-constant';
import {ImageDimension} from '../data/local/image-dimension';
import {ImageQuery} from '../data/remote/rest-api/query/image-query';

@Injectable()
export class ImageService {

  constructor() {
  }

  public buildUrl(imageQuery: ImageQuery): string {
    let width, height;
    switch (imageQuery.dimension) {
      case ImageDimension.W40xH40:
        width = 40;
        height = 40;
        break;
      case ImageDimension.W80xH80:
        width = 80;
        height = 80;
        break;
      case ImageDimension.W130xH130:
        width = 130;
        height = 130;
    }
    return `${PropertyConstant.restUrl}/image/download?clazz=${imageQuery.clazz}&id=${imageQuery.id}&type=${imageQuery.type}&width=${width}&height=${height}`;
  }

  public rebuildUrl(imageQuery: ImageQuery): string {
    return this.buildUrl(imageQuery) + `&date=${new Date().getTime()}`;
  }

}
