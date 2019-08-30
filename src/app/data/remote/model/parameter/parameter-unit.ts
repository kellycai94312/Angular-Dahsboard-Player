import {IdentifiedObject} from '../../base/identified-object';
import {ParameterVersion} from './parameter-version';
import {UnitVersion} from '../unit/unit-version';
import {Type} from 'class-transformer';

export class ParameterUnit extends IdentifiedObject {

  @Type(() => ParameterVersion)
  public parameterVersion: ParameterVersion;

  @Type(() => UnitVersion)
  public unitVersion: UnitVersion;

}
