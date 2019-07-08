import {ShortNameObject} from '../../base/short-name-object';
import {ParameterVersion} from '../parameter/parameter-version';
import {DeviceVersion} from '../device/device-version';

export class Application extends ShortNameObject {
  public manufacturerResource: string;

  //#region Transient
  public applicationVersionId: number;
  public updated: Date;
  public parameterVersions: ParameterVersion[];
  public deviceVersions: DeviceVersion[];
  //#endregion
}
