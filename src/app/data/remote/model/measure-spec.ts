import { MeasureSpecEnum } from '../misc/measure-spec-enum';
import { MeasureUnit } from './measure-unit';
import { NamedObject } from '../base/named-object';

export class MeasureSpec extends NamedObject {
  measureSpecEnum: MeasureSpecEnum;
  measureUnit: MeasureUnit;
}
