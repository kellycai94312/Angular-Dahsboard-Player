import {Injectable} from '@angular/core';
import {ImageDimension} from '../data/local/image-dimension';
import {ImageFormat} from '../data/local/image-format';
import {ImageQuery} from '../data/remote/rest-api/query/file/image-query';
import {environment} from '../../environments/environment';
import {FileClass} from '../data/remote/model/file/base/file-class';

@Injectable()
export class ImageService {

  constructor() {
  }

  public buildUrl(imageDimension: ImageDimension, imageQuery: ImageQuery): string {
    let width, height;
    switch (imageDimension) {
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
    return `${environment.restUrl}/file/download/image?clazz=${imageQuery.clazz}&objectId=${imageQuery.objectId}&type=${imageQuery.type}&width=${width}&height=${height}`;
  }

  public rebuildUrl(imageDimension: ImageDimension, imageQuery: ImageQuery): string {
    return this.buildUrl(imageDimension, imageQuery) + `&date=${new Date().getTime()}`;
  }

  public getImageStyle(format: ImageFormat, dimension: ImageDimension): string {
    switch (format) {

      case ImageFormat.SQUARE:
        switch (dimension) {
          case ImageDimension.W40xH40:
            return 'logo-sm';
          case ImageDimension.W80xH80:
            return 'logo-lg';
          case ImageDimension.W130xH130:
            return 'logo-xl';
        }
        break;

      case ImageFormat.CIRCLE:
        switch (dimension) {
          case ImageDimension.W40xH40:
            return 'logo-sm-circle';
          case ImageDimension.W80xH80:
            return 'logo-lg-circle';
          case ImageDimension.W130xH130:
            return 'logo-xl-circle';
        }
    }
    return null;
  }

}
