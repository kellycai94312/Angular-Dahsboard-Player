import {PageQuery} from '../page-query';
import {UserRoleEnum} from '../../model/user-role-enum';

export class TrainingQuery extends PageQuery {
  personId?: number;
  groupId?: number;
  name?: string;
  userRoleEnum?: UserRoleEnum;
  dateFrom?: Date;
  dateTo?: Date;
  locationId?: number;
}
