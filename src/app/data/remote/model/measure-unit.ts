import { ShortNameObject } from '../base/short-name-object';
import { UnitTypeEnum } from '../misc/unit-type-enum';

export class MeasureUnit extends ShortNameObject {
  measureUnitEnum: string;
  unitTypeEnum: UnitTypeEnum;
  precision: number;
}
