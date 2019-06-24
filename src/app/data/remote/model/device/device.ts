import {ShortNameObject} from '../../base/short-name-object';
import {ParameterVersion} from '../parameter/parameter-version';

export class Device extends ShortNameObject {
  public videoResource: string;
  public manufacturerResource: string;

  //#region Transient
  public parameterVersions: ParameterVersion[];
  public deviceVersionId: number;
  public updated: Date;
  //#endregion
}
