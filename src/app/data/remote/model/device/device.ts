import {ShortNameObject} from '../../base/short-name-object';
import {ParameterVersion} from '../parameter/parameter-version';
import {ExternalResource} from '../external-resource';

export class Device extends ShortNameObject {
  public manufacturerResource: string;

  //#region Transient
  public parameterVersions: ParameterVersion[];
  public deviceVersionId: number;
  public updated: Date;
  public externalResources: ExternalResource[];
  //#endregion
}
