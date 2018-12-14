import {PageQuery} from '../../page-query';
import {GroupTypeEnum} from '../../../model/group/base/group-type-enum';
import {UserRoleEnum} from '../../../model/user-role-enum';
import {StageEnum} from '../../../model/stage/stage-enum';
import {GroupPersonState} from '../../../model/group/group-person-state';

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
