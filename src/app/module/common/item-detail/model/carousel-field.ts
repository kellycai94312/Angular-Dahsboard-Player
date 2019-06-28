import {BaseField} from './base-field';
import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';

export class CarouselField extends BaseField {
  constructor(public data: IdentifiedObject,
              public fileClass: FileClass,
              translationLabel: string) {
    super(translationLabel);
  }
}
