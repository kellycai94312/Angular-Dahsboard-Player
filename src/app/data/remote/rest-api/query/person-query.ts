import {PageQuery} from '../page-query';
import {UserRoleEnum} from '../../model/user-role-enum';
import {SexEnum} from '../../misc/sex-enum';

export class PersonQuery extends PageQuery {
  userRoleEnum?: UserRoleEnum;
  yearBirth?: number;
  sex?: SexEnum;
  groupId?: number;
  sportTypeId?: number;
  cityId?: number;
  template?: boolean;
  canEdit?: boolean;

  unassigned?: boolean;
}
