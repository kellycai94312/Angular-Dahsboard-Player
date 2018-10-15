import {PageQuery} from '../page-query';
import {TrainingState} from '../../misc/training-state';
import {TrainingDiscriminator} from '../../model/training/base/training-discriminator';
import {TrainingType} from '../../model/training/training/training-type';
import {UserRoleEnum} from '../../model/user-role-enum';

export class BaseTrainingQuery extends PageQuery {
  template?: boolean;
  state?: TrainingState;
  type?: TrainingType;
  discriminator?: TrainingDiscriminator;
  measureParameterEnum?: string;
  locationId?: number;
  dateFrom?: Date;
  dateTo?: Date;
  sort?: string;
  eventPlanId?: number;

  userRoleEnum?: UserRoleEnum;
}
