import {UserRoleEnum} from '../../model/user-role-enum';
import {PersonQuery} from './person-query';

export class TrainingPersonQuery extends PersonQuery {
  userRoleEnum: UserRoleEnum;
}
