import {PageQuery} from '../page-query';
import {TrainingState} from '../../misc/training-state';
import {UserRoleEnum} from '../../model/user-role-enum';
import {EventType} from '../../model/event/base/event-type';

export class BaseTrainingQuery extends PageQuery {
  template?: boolean;
  state?: TrainingState;
  discriminator?: EventType;
  measureParameterEnum?: string;
  locationId?: number;
  dateFrom?: Date;
  dateTo?: Date;
  sort?: string;
  eventPlanId?: number;

  userRoleEnum?: UserRoleEnum;
}
