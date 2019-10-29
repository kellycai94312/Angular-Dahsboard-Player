import { GroupTypeEnum } from 'app/data/remote/model/group/base';
import { GroupPersonState } from 'app/data/remote/model/group/person';
import { StageEnum } from 'app/data/remote/model/stage/stage-enum';
import { UserRoleEnum } from 'app/data/remote/model/user-role-enum';
import { PageQuery } from 'app/data/remote/rest-api/page-query';

export class EventGroupQuery extends PageQuery {
  groupTypeEnum?: GroupTypeEnum;
  userRoleEnum?: UserRoleEnum;
  sportTypeId?: number;
  ageGroupId?: number;
  leagueId?: number;
  countryId?: number;
  regionId?: number;
  cityId?: number;
  stageEnum?: StageEnum;
  stageYear?: number;
  // Группы, в которых состоят пользователи, находящиеся в беседе
  conversationId?: number;
  // Все группы или привязанные к пользователю
  all?: boolean;
  state?: GroupPersonState;
  // Может ли пользователь редактировать группу
  canEdit?: boolean;
  unassigned?: boolean;
}
