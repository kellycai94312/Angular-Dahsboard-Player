import {BaseParameter} from './base-parameter';
import {DictionaryType} from '../base/dictionary-type';

export class SystemParameter extends BaseParameter {
  constructor() {
    super();
    this.discriminator = DictionaryType.SYSTEM;
  }
}
