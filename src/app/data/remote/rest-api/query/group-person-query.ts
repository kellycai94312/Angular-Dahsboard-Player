import { GroupPersonClaimState, GroupPersonState, GroupPersonType } from 'app/data/remote/model/group/person';
import { PositionEnum } from 'app/data/remote/model/person-position/position-enum';
import { PositionLevelEnum } from 'app/data/remote/model/person-position/position-level-enum';
import { UserRoleEnum } from 'app/data/remote/model/user-role-enum';
import { PageQuery } from '../page-query';

export class GroupPersonQuery extends PageQuery {
  // @deprecated
  public id?: number;
  public unassigned?: boolean;
  public groupPersonType?: GroupPersonType;
  public groupPersonState?: GroupPersonState;
  public groupPersonClaimState?: GroupPersonClaimState;
  public connected?: boolean;
  public positionLevelEnum?: PositionLevelEnum;
  public positionEnum?: PositionEnum;

  public userRoleEnum?: UserRoleEnum;
}
