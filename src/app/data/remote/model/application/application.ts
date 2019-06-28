import {ShortNameObject} from '../../base/short-name-object';

export class Application extends ShortNameObject {
  public manufacturerResource: string;

  //#region Transient
  public deviceVersionId: number;
  //#endregion
}
