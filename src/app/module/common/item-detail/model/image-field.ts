import {BaseField} from './base-field';
import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {ImageType} from '../../../../data/remote/model/file/image/image-type';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {ImageFormat} from '../../../../data/local/image-format';

export class ImageField extends BaseField {
  constructor(translationLabel: string,
              public object: IdentifiedObject,
              public type: ImageType,
              public fileClass: FileClass,
              public format: ImageFormat) {
    super(translationLabel);
  }
}
