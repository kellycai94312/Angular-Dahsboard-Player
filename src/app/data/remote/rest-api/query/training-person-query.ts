import {PageQuery} from '../page-query';
import {UserRoleEnum} from '../../model/user-role-enum';

export class TrainingPersonQuery extends PageQuery {
  public unassigned?: boolean;
  public userRole?: UserRoleEnum;
  public groupId?: number;
}
