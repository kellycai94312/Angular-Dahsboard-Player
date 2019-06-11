import {BaseUnit} from './base-unit';
import {DictionaryType} from '../../misc/dictionary-type';

export class SystemUnit extends BaseUnit {
  constructor() {
    super();
    this.discriminator = DictionaryType.SYSTEM;
  }
}
