import {BaseField} from './base-field';

export class TextField extends BaseField {
  constructor(translationLabel: string,
              public value: string) {
    super(translationLabel);
  }
}
