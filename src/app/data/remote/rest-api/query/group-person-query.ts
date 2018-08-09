import {PageQuery} from '../page-query';
import {UserRoleEnum} from '../../model/user-role-enum';

export class GroupPersonQuery extends PageQuery {
  public id?: number;
  public subGroupId?: number;
  public userRoleEnum?: UserRoleEnum;
  public approved?: boolean;
  public admin?: boolean;
}
