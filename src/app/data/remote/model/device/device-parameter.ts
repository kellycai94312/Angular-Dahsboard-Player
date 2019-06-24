import {IdentifiedObject} from '../../base/identified-object';
import {DeviceVersion} from './device-version';
import {ParameterVersion} from '../parameter/parameter-version';

export class DeviceParameter extends IdentifiedObject {
  public deviceVersion: DeviceVersion;
  public parameterVersion: ParameterVersion;
}
