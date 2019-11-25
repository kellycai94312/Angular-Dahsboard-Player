import { GroupClaimStateEnum } from 'app/data/remote/model/group';
import { GroupTypeEnum } from 'app/data/remote/model/group/base';
import { GroupPersonTypeStateEnum } from 'app/data/remote/model/group/person';
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
  public stateEnum?: GroupPersonTypeStateEnum;
  public claimStateEnum?: GroupClaimStateEnum;
  // Может ли пользователь редактировать группу
  public canEdit?: boolean;
  public unassigned?: boolean;
}
