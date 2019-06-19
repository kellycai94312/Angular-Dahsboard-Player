import {ShortNameObject} from '../../base/short-name-object';
import {BaseParameter} from './base-parameter';
import {ParameterTypeEnum} from './parameter-type-enum';

export class ParameterVersion extends ShortNameObject {
  public parameter: BaseParameter;
  public parameterTypeEnum: ParameterTypeEnum;
  public formula: string;
}
