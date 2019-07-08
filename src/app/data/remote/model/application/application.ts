import {ShortNameObject} from '../../base/short-name-object';
import {ParameterVersion} from '../parameter/parameter-version';

export class Application extends ShortNameObject {
  public manufacturerResource: string;

  //#region Transient
  public deviceVersionId: number;
  public parameterVersions: ParameterVersion[];
  //#endregion
}
