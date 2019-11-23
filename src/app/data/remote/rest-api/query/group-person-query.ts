import { GroupClaimStateEnum } from 'app/data/remote/model/group';
import { GroupPersonTypeEnum, GroupPersonTypeStateEnum } from 'app/data/remote/model/group/person';
import { PositionEnum } from 'app/data/remote/model/person-position/position-enum';
import { PositionLevelEnum } from 'app/data/remote/model/person-position/position-level-enum';
import { UserRoleEnum } from 'app/data/remote/model/user-role-enum';
import { PageQuery } from '../page-query';

export class GroupPersonQuery extends PageQuery {
  // @deprecated
  public id?: number;
  public unassigned?: boolean;
  public groupPersonTypeEnum?: GroupPersonTypeEnum;
  public stateEnum?: GroupPersonTypeStateEnum;
  public claimStateEnum?: GroupClaimStateEnum;
  public connected?: boolean;
  public positionLevelEnum?: PositionLevelEnum;
  public positionEnum?: PositionEnum;

  public userRoleEnum?: UserRoleEnum;
}
