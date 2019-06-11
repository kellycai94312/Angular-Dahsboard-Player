import {NamedObject} from '../../base/named-object';
import {DictionaryType} from '../../misc/dictionary-type';
import {UnitTypeEnum} from '../../misc/unit-type-enum';

export class BaseUnit extends NamedObject {
  public discriminator: DictionaryType;
  public unitTypeEnum: UnitTypeEnum;
}
