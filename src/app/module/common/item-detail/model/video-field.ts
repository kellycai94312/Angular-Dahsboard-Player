import {BaseField} from './base-field';

export class VideoField extends BaseField {
  constructor(translationLabel: string,
              public videoUrl: string) {
    super(translationLabel);
  }
}
