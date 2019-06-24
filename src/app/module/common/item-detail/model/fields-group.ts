import {BaseField} from './base-field';

export class FieldsGroup {
  constructor(public tranlsationLabel: string,
              public fields: BaseField[]) {
  }
}
