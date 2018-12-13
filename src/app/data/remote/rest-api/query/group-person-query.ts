import {PageQuery} from '../page-query';
import {UserRoleEnum} from '../../model/user-role-enum';
import {GroupPersonState} from '../../model/group/group-person-state';

export class GroupPersonQuery extends PageQuery {
  //@deprecated
  id?: number;
  unassigned?: boolean;
  state?: GroupPersonState;
  connected?: boolean;

  subGroupId?: number;
  userRoleEnum?: UserRoleEnum;
}
