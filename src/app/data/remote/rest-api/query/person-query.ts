import {PageQuery} from '../page-query';

export class PersonQuery extends PageQuery {
  public yearBirth?: number;
  public sex?: string;
  public userRoleId?: number;
  public groupId?: number;
  public sportTypeId?: number;
  public cityId?: number;
  public template?: boolean;
  //#region Organization
  public unassigned?: boolean;
  //#endregion
}
