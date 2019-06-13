import {DictionaryType} from '../../misc/dictionary-type';
import {UnitTypeEnum} from '../../misc/unit-type-enum';
import {ShortNameObject} from '../../base/short-name-object';

export class BaseUnit extends ShortNameObject {
  public discriminator: DictionaryType;
  public unitTypeEnum: UnitTypeEnum;
}
