import {BaseField} from './base-field';

export class UrlField extends BaseField {
  constructor(translationLabel: string,
              public url: string) {
    super(translationLabel);
  }
}
