import {PageQuery} from '../page-query';

export class PersonQuery extends PageQuery {
  public fullName?: string;
  public yearBirth?: number;
  public sex?: string;
  public userRoleId?: number;
  public groupId?: number;
  public sportTypeId?: number;
  public cityId?: number;
}
