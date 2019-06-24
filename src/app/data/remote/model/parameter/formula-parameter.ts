import {IdentifiedObject} from '../../base/identified-object';
import {ParameterVersion} from './parameter-version';

export class FormulaParameter extends IdentifiedObject {
  public formula: ParameterVersion;
  public parameter: ParameterVersion;
}
