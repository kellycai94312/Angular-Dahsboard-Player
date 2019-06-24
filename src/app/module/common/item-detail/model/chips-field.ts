import {BaseField} from './base-field';

export class ChipsField extends BaseField {
  constructor(translationLabel: string,
              public values: string[]) {
    super(translationLabel);
  }
}
