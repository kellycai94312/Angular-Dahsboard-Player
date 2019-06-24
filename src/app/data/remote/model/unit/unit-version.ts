import {ShortNameObject} from '../../base/short-name-object';
import {BaseUnit} from './base-unit';
import {UnitTypeEnum} from '../../misc/unit-type-enum';

export class UnitVersion extends ShortNameObject {
  public baseUnit: BaseUnit;
  public unitTypeEnum: UnitTypeEnum;
}
