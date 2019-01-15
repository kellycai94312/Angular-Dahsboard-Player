import {PageQuery} from '../page-query';
import {UserRoleEnum} from '../../model/user-role-enum';
import {GroupPersonState} from '../../model/group/group-person-state';
import {PositionLevelEnum} from '../../model/person-position/position-level-enum';

export class GroupPersonQuery extends PageQuery {
  //@deprecated
  id?: number;
  unassigned?: boolean;
  state?: GroupPersonState;
  connected?: boolean;
  positionLevelEnum?: PositionLevelEnum;

  subGroupId?: number;
  userRoleEnum?: UserRoleEnum;
}
