import {PageQuery} from '../page-query';
import {UserRoleEnum} from '../../model/user-role-enum';

export class PersonQuery extends PageQuery {
  public yearBirth?: number;
  public sex?: string;
  public userRoleEnum?: UserRoleEnum;
  public groupId?: number;
  public sportTypeId?: number;
  public cityId?: number;
  public template?: boolean;
  public unassigned?: boolean;
}
