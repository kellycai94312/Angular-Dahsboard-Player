import { MeasureUnit } from './measure-unit';
import { MeasureParameter } from './measure-parameter';
import { IdentifiedObject } from '../base/identified-object';

export class Measure extends IdentifiedObject {
  measureParameter: MeasureParameter;
  measureUnit: MeasureUnit;
}
