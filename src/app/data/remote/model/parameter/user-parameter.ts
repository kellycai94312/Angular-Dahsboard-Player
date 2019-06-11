import {BaseParameter} from './base-parameter';
import {DictionaryType} from '../base/dictionary-type';

export class UserParameter extends BaseParameter {
  public open: boolean;

  constructor() {
    super();
    this.discriminator = DictionaryType.USER;
  }
}
