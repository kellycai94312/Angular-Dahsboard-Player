import { MeasureUnit } from './measure-unit';
import { ShortNameObject } from '../base/short-name-object';
import { MeasureParameter } from './measure-parameter';

export class Measure extends ShortNameObject {
  measureParameter: MeasureParameter;
  measureUnit: MeasureUnit;
}
