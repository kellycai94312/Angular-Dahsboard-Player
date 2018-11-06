import {PageQuery} from '../../page-query';
import {GroupTypeEnum} from '../../../model/group/base/group-type-enum';
import {UserRoleEnum} from '../../../model/user-role-enum';
import {StageEnum} from '../../../model/stage/stage-enum';

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
  // Все группы или привязанные к пользователю
  all?: boolean;
  // Подтвержден ли пользователь в группе
  approved?: boolean;
  // Может ли пользователь редактировать группу
  canEdit?: boolean;
  unassigned?: boolean;
}
