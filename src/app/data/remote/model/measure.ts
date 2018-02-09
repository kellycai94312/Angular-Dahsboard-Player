import {MeasureEnum} from '../misc/measure-enum';
import {MeasureUnit} from './measure-unit';
import {ShortNameObject} from '../base/short-name-object';

export class Measure extends ShortNameObject {
  measureEnum: MeasureEnum;
  measureUnit: MeasureUnit;
}
