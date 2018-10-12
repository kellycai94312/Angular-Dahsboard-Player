import {PageQuery} from '../../page-query';
import {GroupTypeEnum} from '../../../model/group/base/group-type-enum';
import {UserRoleEnum} from '../../../model/user-role-enum';
import {StageTypeEnum} from '../../../model/stage/stage-type-enum';
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
  stageTypeEnum?: StageTypeEnum;
  stageYear?: number;
  //все группы или привязанные к пользователю
  all?: boolean;
  //подтвержден ли пользователь в группе
  approved?: boolean;
  //является ли пользователь администратором группы
  admin?: boolean;
  unassigned?: boolean;
}
