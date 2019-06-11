import {DictionaryType} from '../../misc/dictionary-type';
import {BaseUnit} from './base-unit';

export class UserUnit extends BaseUnit {
  public open: boolean;

  constructor() {
    super();
    this.discriminator = DictionaryType.USER;
  }
}

