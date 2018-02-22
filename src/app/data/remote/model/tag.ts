import { IdentifiedObject } from '../base/identified-object';
import { DictionaryType } from '../misc/dictionary-type';

export class Tag extends IdentifiedObject {
  name: string;
  dictionaryType: DictionaryType;
}
