import { GroupTypeEnum } from 'app/data/remote/model/group/base';
import { GroupPersonTypeClaimState, GroupPersonTypeState } from 'app/data/remote/model/group/person';
import { StageEnum } from 'app/data/remote/model/stage/stage-enum';
import { UserRoleEnum } from 'app/data/remote/model/user-role-enum';
import { PageQuery } from 'app/data/remote/rest-api/page-query';

export class EventGroupQuery extends PageQuery {
  public groupTypeEnum?: GroupTypeEnum;
  public userRoleEnum?: UserRoleEnum;
  public sportTypeId?: number;
  public ageGroupId?: number;
  public leagueId?: number;
  public countryId?: number;
  public regionId?: number;
  public cityId?: number;
  public stageEnum?: StageEnum;
  public stageYear?: number;
  // Группы, в которых состоят пользователи, находящиеся в беседе
  public conversationId?: number;
  // Все группы или привязанные к пользователю
  public all?: boolean;
  public state?: GroupPersonTypeState;
  public claimState?: GroupPersonTypeClaimState;
  // Может ли пользователь редактировать группу
  public canEdit?: boolean;
  public unassigned?: boolean;
}
